import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ComponentModule} from '../_components/component.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {HeaderComponent} from '../_helpers/header/header.component';
import {UpdateEmployeerComponent} from './employer/updateEmployeer';
import {AgmCoreModule} from '@agm/core';
import {UpdateJobSeekerComponent} from './jobSeeker/updateJobSeeker';
import {UpdateNewJobSeekerComponent} from './jobSeeker/updateNewJobSeeker/updateNewJobSeeker.component';
import {ViewUpdateJobSeekerComponent} from './jobSeeker/viewUpdateJobSeeker/viewUpdateJobSeeker.component';
import {PasswordRecoveryComponent} from '../_helpers/passwordRecovery';
import {ProfileListComponent} from './profile-list/profile-list.component';
import {SchedularComponent} from './schedular/schedular.component';
import {UnAssignedListComponent} from './un-assigned-list/un-assigned-list.component';
import {UniversalDashboardComponent} from './universalDashboard/universalDashboard.component';
import {JobViewComponent} from './job-view/job-view.component';
import {OrganizationListComponent} from './organization-list/organization-list.component';
import {JobSeekerListComponent} from './jobSeeker-list/jobSeeker-list.component';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ViewOrgDialogComponent} from '../_components/ViewOrgDialog/viewOrgDialog.component';
import {InputMaskModule} from 'primeng/inputmask';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChangePasswordDialogComponent} from '../_components/changePasswordDialog';
import {CompletedListComponent} from './completed-list/completed-list.component';
import {RejectedListComponent} from './rejected-list/rejected-list.component';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts/dist/echarts.js';
import {ScheduleInterviewComponent} from '../_components/scheduleInterview';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {ViewJobSeekerComponent} from './employer/viewJobSeeker';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {TooltipModule} from 'primeng/tooltip';
import { WalletComponent } from './wallet/wallet/wallet.component';
import { WalletDialogComponent } from './wallet/wallet/wallet-dialog/wallet-dialog.component';
import {ViewJobSeekerPoComponent} from './placementOfficer/poDashboard/poViewJobSeeker/viewJobSeekerPo.component';
import { ChipsModule } from 'primeng/chips';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AllJobsComponent} from './all-jobs/all-jobs.component';
import {JobsPrPoComponent} from './jobs-pr-po/jobs-pr-po.component';
import {CareerResourceCentreComponent} from './jobSeeker/career-resource-centre/career-resource-centre.component';
import {CheckboxModule, EditorModule} from 'primeng';
import {BulkCandidateDataUploadComponent} from './bulkCandidateDataUpload/bulkCandidateDataUpload.component';
import {HolidaysComponent} from './holidays/holidays.component';

@NgModule({
  declarations: [PagesComponent, HeaderComponent, UpdateEmployeerComponent,
    UpdateJobSeekerComponent, ViewJobSeekerComponent, UpdateNewJobSeekerComponent,
    ViewUpdateJobSeekerComponent,
    UnAssignedListComponent,
    AllJobsComponent,
    JobsPrPoComponent,
    SchedularComponent,
    HolidaysComponent,
    JobViewComponent,
    OrganizationListComponent,
    JobSeekerListComponent,
    ViewOrgDialogComponent,
    ChangePasswordDialogComponent,
    ScheduleInterviewComponent,
    ProfileListComponent,
    CompletedListComponent,
    RejectedListComponent,
    BulkCandidateDataUploadComponent,
    UniversalDashboardComponent,
    ContactUsComponent,
    WalletComponent,
    CareerResourceCentreComponent,
    WalletDialogComponent, ViewJobSeekerPoComponent],

    imports: [
        ChipsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        ComponentModule,
        PagesRoutingModule,
        TableModule,
        CalendarModule,
        InputMaskModule,
        SliderModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ProgressBarModule,
        InputSwitchModule,
        ConfirmDialogModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        ComponentModule,
        AutoCompleteModule,
        PagesRoutingModule,
        NgbModule,
        FullCalendarModule,
        TooltipModule,
        ScrollPanelModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBbzHzr894lVdXlR_PRSbtKh_JtICxCPhI',
            // apiKey: 'AIzaSyBQqsihG9mQtyz33NNcmug8dAJnIkkrDvQ',
            libraries: ['places']
        }),
        NgxEchartsModule.forRoot({
            echarts
        }),
        PdfViewerModule,
        CheckboxModule,
        EditorModule,
    ],
  exports: [FullCalendarModule],
  entryComponents: [ViewOrgDialogComponent, ChangePasswordDialogComponent, ScheduleInterviewComponent],
  bootstrap: [ScheduleInterviewComponent],
  providers: [
    NgbActiveModal,
    DatePipe,

  ]
})
export class PagesModule {
}
