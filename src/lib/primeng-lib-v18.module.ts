import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Importação dos módulos do PrimeNG versão 18
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { BadgeModule } from "primeng/badge";
import { BlockUIModule } from "primeng/blockui";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ColorPickerModule } from "primeng/colorpicker";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DockModule } from "primeng/dock";
import { DragDropModule } from "primeng/dragdrop";
import { DropdownModule } from "primeng/dropdown";
import { DynamicDialog } from "primeng/dynamicdialog";
import { EditorModule } from "primeng/editor";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FocusTrapModule } from "primeng/focustrap";
import { GalleriaModule } from "primeng/galleria";
import { ImageModule } from "primeng/image";
import { InplaceModule } from "primeng/inplace";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { Textarea } from "primeng/inputtextarea";
import { KnobModule } from "primeng/knob";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SkeletonModule } from "primeng/skeleton";
import { SliderModule } from "primeng/slider";
import { SplitterModule } from "primeng/splitter";
import { SplitButtonModule } from "primeng/splitbutton";
import { StepsModule } from "primeng/steps";
import { TableModule } from "primeng/table";
import { TabMenuModule } from "primeng/tabmenu";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeSelectModule } from "primeng/treeselect";
import { TreeTableModule } from "primeng/treetable";

// Serviços do PrimeNG
import { ConfirmationService, MessageService } from "primeng/api";
import { PrimengService } from "./services/primeng.service";
import { ResponsiveButtonComponent } from "./components/responsive-button/responsive-button.component";
import { ResponsiveSidebarComponent } from "./components/responsive-sidebar/responsive-sidebar.component";
import { SearchScreenComponent } from "./components/search-screen/search-screen.component";
import { SearchFieldComponent } from "./components/search-field/search-field.component";
import { CrudToolbarComponent } from "./components/crud-toolbar/crud-toolbar.component";
import { TranslateModule } from "@ngx-translate/core";
import { InputTextComponent } from "./components/input-text/input-text.component";
import { ToastComponent } from "./components/toast/toast.component";
import { TextAreaComponent } from "./components/text-area/text-area.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ResponsiveButtonComponent,
    ResponsiveSidebarComponent,
    SearchScreenComponent,
    SearchFieldComponent,
    CrudToolbarComponent,
    InputTextComponent,
    ToastComponent,
    TextAreaComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    // Módulos do PrimeNG
    AccordionModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BlockUIModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DockModule,
    DragDropModule,
    DropdownModule,
    DynamicDialog,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    FocusTrapModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    Textarea,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SliderModule,
    SplitterModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
  ],
  exports: [
    ResponsiveButtonComponent,
    ResponsiveSidebarComponent,
    SearchScreenComponent,
    SearchFieldComponent,
    CrudToolbarComponent,
    InputTextComponent,
    ToastComponent,
    TextAreaComponent,

    // Módulos do PrimeNG
    AccordionModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BlockUIModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DockModule,
    DragDropModule,
    DropdownModule,
    DynamicDialog,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    FocusTrapModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    Textarea,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SliderModule,
    SplitterModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
  ],

  providers: [
    // Serviços do PrimeNG
    PrimengService,
    ConfirmationService,
    MessageService,
  ],
})
export class PrimengLibV18Module {}
