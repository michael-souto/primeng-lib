import { Injectable, OnInit } from "@angular/core";
import { DetailCrudHelper } from "projects/design-lib/src/lib/services/detail-crud-helper";
import { ActivatedRoute } from "@angular/router";
import { TreeNode } from "primeng/api";
import { ControllerService } from "projects/design-lib/src/lib/services/controller.service";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { CustomReport } from "../models/custom-report.model";
import { ReportFilter } from "../models/report-filter.model";
import { ReportSession } from "../models/report-session.model";
import { View } from "../models/view.mode";

@Injectable({
  providedIn: "root",
})
export class CustomReportsControllerService extends ControllerService<CustomReport> {
  constructor(
    protected override framework: FrameworkService,
    public activateRoute: ActivatedRoute
  ) {
    super(framework, CustomReport);
  }

  filterSelected: any;

  public filterDetail: DetailCrudHelper<ReportFilter> =
    new DetailCrudHelper<ReportFilter>(() => new ReportFilter());

  addFilter() {
    if (
      this.object.filters.findIndex(
        (x) => x.filter.id == this.filterSelected.id
      ) < 0
    ) {
      this.filterDetail.newItem(
        this.object.filters,
        null,
        null,
        this.activateRoute
      );
      this.filterDetail.currentItem.filter = this.filterSelected;
      this.filterDetail.saveItem();
    }
    this.orderingFilters();
  }

  deleteFilter(filter: ReportFilter) {
    this.filterDetail.removeItem(filter, this.object.filters);
    this.orderingFilters();
  }

  public sessionDetail: DetailCrudHelper<ReportSession> =
    new DetailCrudHelper<ReportSession>(
      () => new ReportSession(),
      (session: ReportSession) => this.afterAddSession(session)
    );

  afterAddSession(session: ReportSession) {
    console.log("afterAddSession", this.selectedFields);
    if (!session.ordering) {
      session.ordering = this.object.sessions.length + 1;
    }
    if (session.type === "TABLE_COLUMN") {
    session.fields = this.selectedFields
      .filter((selectedField) => selectedField.data?.id)
      .map((selectedField) => ({
        id: null,
        field: selectedField.data,
        tableView: selectedField.data.tableView,
        columnNumber: selectedField.data.columnNumber,
      }));
      if (!session.ordering) {
        session.ordering = this.object.sessions.length + 1;
      }
    } else {
      if (this.chartFieldSelected) {
        session.fields = [
          {
            id: null,
            field: { ...this.chartFieldSelected }, // Garante que pegamos os dados corretamente
            tableView: this.chartFieldSelected.tableView, // Mantém a referência ao TableView
            columnNumber: this.selectedFields.findIndex((f) => f.data.id === this.chartFieldSelected.id) + 1,
          }
        ];
      } else {
        console.warn("Nenhum campo selecionado para adicionar à sessão.");
        session.fields = [];
      }
    }
    this.framework.router.navigate(["./"], { relativeTo: this.activateRoute });
  }

  newSession() {
    this.selectedFields = [];
    this.sessionDetail.newItem(
      this.object.sessions,
      "sessions",
      this.framework.router,
      this.activateRoute
    );
    this.sessionDetail.currentItem.displaySize = 100;
  }

  editSession(session: ReportSession) {
    this.loaadSelectedFields(session);
    this.sessionDetail.editItem(
      session,
      "sessions",
      this.framework.router,
      this.activateRoute
    );
  }

  deleteSession(session: ReportSession) {
    this.sessionDetail.removeItem(session, this.object.sessions);
  }

  fields!: TreeNode<any>[];
  selectedFields = [];
  viewSelected: any;
  chartFields: any[] = [];
  chartFieldSelected: any;
  filteredChartFields: any[] = [];

  loadFields(view: View) {
    this.selectedFields = [];
    this.object.view = view;

    this.filteredChartFields = this.chartFields = view.tableViews
    .flatMap((tv) =>
      tv.dataTable.fields
        .filter((f) => !f.hidden)
        .map((field) => ({
          tableView: tv,
          ...field
        }))
    );
    // Criar a estrutura agrupada para AutoComplete
    this.chartFields = view.tableViews.map((tv) => ({
      label: tv.dataTable.description, // Nome do grupo (TableView)
      value: tv, // Referência ao tableView
      items: tv.dataTable.fields
        .filter((f) => !f.hidden)
        .map((field) => ({
          tableView: tv,
          ...field
        }))
    }));

    // Inicialmente, todos os grupos estão disponíveis
    this.filteredChartFields = [...this.chartFields];


    this.fields = view.tableViews.map((tv) => {
      const treeNodeRaiz: TreeNode<any> = {
        label: tv.dataTable.description,
        data: null,
        icon: "",
        children: tv.dataTable.fields
          .filter((f) => !f.hidden)
          .map((f) => {
            const treeNodeField: TreeNode<any> = {
              label: f.fieldHeader[this.framework.language],
              data: { ...f, columnNumber: 0 },
              icon: "",
              selectable: true,
              key: f.id.toString(),
            };
            tv.dataTable.fields = [];
            treeNodeField.data.tableView = tv;
            return treeNodeField;
          }),
        selectable: false,
        expanded: true,
      };
      return treeNodeRaiz;
    });
  }

  loaadSelectedFields(session: ReportSession) {
    console.log("session", this.chartFields);
    this.chartFieldSelected = session.fields[0].field;
    this.chartFieldSelected['tableView'] = session.fields[0].tableView;

    this.selectedFields = session.fields.map((f) => {
      const treeNodeField: TreeNode<any> = {
        label: f.field?.fieldHeader[this.framework.language],
        data: { ...f.field, columnNumber: f.columnNumber },
        icon: "",
        selectable: true,
        key: f.field.id.toString(),
      };
      treeNodeField.data.tableView = f.tableView;
      return treeNodeField;
    });
    this.selectedFields.sort((a, b) => a.data.columnNumber - b.data.columnNumber);
  }

  filterChartFields(event: any) {
    let query = event.query.toLowerCase();
    let filteredGroups = [];

    for (let group of this.chartFields) {
      let filteredItems = group.items.filter((f) =>
        f.fieldHeader.pt?.toLowerCase().includes(query)
      );

      if (filteredItems.length > 0) {
        filteredGroups.push({
          label: group.label,
          value: group.value,
          items: filteredItems
        });
      }
    }

    this.filteredChartFields = filteredGroups;
  }

  orderingSelecterFields() {
    this.selectedFields.forEach((f, index) => {
      f.data.columnNumber = index + 1;
    });
  }

  orderingFilters() {
    this.object.filters.forEach((f, index) => {
      f.ordering = index + 1;
    });
  }

  onNodeSelect(event: any) {
    this.selectedFields = this.selectedFields.filter((f) => f.data);
    this.orderingSelecterFields();
  }

  onNodeUnselect(event: any) {
    this.selectedFields = this.selectedFields.filter((f) => f.data);
    this.orderingSelecterFields();
  }
}
