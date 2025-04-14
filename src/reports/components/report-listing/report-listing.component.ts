import { Component, OnInit } from "@angular/core";
import { ListRegisterComponent } from "projects/design-lib/src/lib/components/list-register/list-register.component";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { CustomReport } from "projects/primeng-lib/src/reports/models/custom-report.model";
import { CustomReportCrudApiService } from "projects/primeng-lib/src/reports/services/custom-report-crud-api.service";
import { CustomReportsControllerService } from "../../services/custom-reports-controller.service";
import { FavoriteService } from "projects/security-lib/src/lib/services/auth/favorite.service";
import { UserFavorite } from "projects/security-lib/src/lib/models/user-favorite.model";
import { EventBusService } from "projects/design-lib/src/lib/services/event-bus.service";
import { MenuService } from "src/app/layout/app.menu.service";
@Component({
  selector: "d-report-listing",
  templateUrl: "./report-listing.component.html",
  styleUrls: ["./report-listing.component.scss"],
})
export class ReportListingComponent
  extends ListRegisterComponent<CustomReport>
  implements OnInit
{
  constructor(
    protected override service: CustomReportCrudApiService,
    protected override controller: CustomReportsControllerService,
    public override framework: FrameworkService,
    public favoriteService: FavoriteService,
  ) {
    super(service, controller, framework);
  }

  ngOnInit() {
    this.framework.eventBusService.emit({
      type: "report:listing",
      callback: () => {
        this.new();
      },
    });
  }
  override getRouterLink(): string {
    return "reports";
  }

  print(id: string) {
    this.framework.router.navigate(["/reports", id, "print"], {
      queryParams: { load: "true" },
    });
  }

  favorite(object: CustomReport) {
    if (this.favoriteService.existsFavorite(object.id)) {
      this.favoriteService.removeFavorite(object.id);
    } else {
      const favorite = new UserFavorite();
      favorite.name = object.name;
      favorite.url = object.id;
      favorite.route = "/reports/" + object.id + "/print?load=true";
      favorite.feature = "reports";
      favorite.entityId = object.id;
      favorite.icon = "fa-solid fa-chart-pie";
      favorite.system = "task";
      this.favoriteService.addFavorite(favorite);
    }
  }
}
