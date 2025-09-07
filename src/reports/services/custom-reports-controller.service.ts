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
    new DetailCrudHelper<ReportFilter>(
      this.framework,
      () => new ReportFilter()
    );

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
      this.framework,
      () => new ReportSession(),
      (session: ReportSession) => this.afterAddSession(session)
    );

  afterAddSession(session: ReportSession) {
    if (!session.ordering) {
      session.ordering = this.object.sessions.length + 1;
    }

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

  loadFields(view: View) {
    this.selectedFields = [];
    this.object.view = view;

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
    this.selectedFields.sort(
      (a, b) => a.data.columnNumber - b.data.columnNumber
    );
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
