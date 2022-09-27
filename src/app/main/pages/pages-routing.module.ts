import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {AuthGuard} from '../_helpers';
import {UpdateEmployeerComponent} from './employer/updateEmployeer';
import {ProfileListComponent} from './profile-list/profile-list.component';
import {SchedularComponent} from './schedular/schedular.component';
import {UnAssignedListComponent} from './un-assigned-list/un-assigned-list.component';
import {JobViewComponent} from './job-view/job-view.component';
import {UpdateJobSeekerComponent} from './jobSeeker/updateJobSeeker';
import {UpdateNewJobSeekerComponent} from './jobSeeker/updateNewJobSeeker/updateNewJobSeeker.component';
import {ViewUpdateJobSeekerComponent} from './jobSeeker/viewUpdateJobSeeker/viewUpdateJobSeeker.component';
import {OrganizationListComponent} from './organization-list/organization-list.component';
import {JobSeekerListComponent} from './jobSeeker-list/jobSeeker-list.component';
import {CompletedListComponent} from './completed-list/completed-list.component';
import {RejectedListComponent} from './rejected-list/rejected-list.component';
import {ViewJobSeekerComponent} from './employer/viewJobSeeker';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {WalletComponent} from './wallet/wallet/wallet.component';
import {ViewJobSeekerPoComponent} from './placementOfficer/poDashboard/poViewJobSeeker/viewJobSeekerPo.component';
import {ProfileSearchComponent} from './placementOfficer/poDashboard/profileSearch/profileSearch.component';
import {AllJobsComponent} from './all-jobs/all-jobs.component';
import {JobsPrPoComponent} from './jobs-pr-po/jobs-pr-po.component';
import {CareerResourceCentreComponent} from './jobSeeker/career-resource-centre/career-resource-centre.component';
import {ConstantsGlobal} from '../_models/constant-global';
import {BulkDataUploadComponent} from './adminPlacementOfficer/adminPODashboard/bulkDataUpload/bulkDataUpload.component';
import {BulkCandidateDataUploadComponent} from './bulkCandidateDataUpload/bulkCandidateDataUpload.component';
import {UniversalDashboardComponent} from './universalDashboard/universalDashboard.component';
import {HolidaysComponent} from './holidays/holidays.component';
import {KamayiSalesOfficerModule} from './kamayiSaleOfficer/kamayiSalesOfficerDashboard/kamayiSalesOfficer.module';
import {ChangePasswordDialogComponent} from '../_components/changePasswordDialog';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: 'employer-dashboard', loadChildren: () => import('./employer/employerDashboard/dashboard.module').then(
          m => m.DashboardModule)
      },
      {
        path: 'kamayi-sales-dashboard',
        loadChildren: () => import('./kamayiSaleOfficer/kamayiSalesOfficerDashboard/kamayiSalesOfficer.module').then(
          m => m.KamayiSalesOfficerModule)
      },
      {
        path: 'po-dashboard', loadChildren: () => import('./placementOfficer/poDashboard/poDashboard.module').then(
          m => m.PoDashboardModule)
      },
      {
        path: 'admin-po-dashboard',
        loadChildren: () => import('./adminPlacementOfficer/adminPODashboard/adminPODashboard.module').then(
          m => m.AdminPODashboardModule)
      },
      {
        path: 'po-teamLead-dashboard',
        loadChildren: () => import('./adminPlacementOfficer/poTeamLead/poTeamLead/poTeamLeadDashboard.module').then(
          m => m.PoTeamLeadDashboardModule)
      },
      {
        path: 'job-seeker-dashboard',
        loadChildren: () => import('./jobSeeker/jobSeekerDashboard/jobSeekerDashboard.module').then(
          m => m.JobSeekerDashboardModule)
      },
      {
        path: 'admin-dashboard', loadChildren: () => import('./admin/adminDashboard/adminDashboard.module').then(
          m => m.AdminDashboardModule)
      },
      {
        path: 'job', loadChildren: () => import('./employer/JobPosting/job.module').then(
          m => m.JobModule)
      },
      {
        path: 'dashboard-Universal',
        component: UniversalDashboardComponent
      },
      {
        path: 'update-jobSeeker',
        component: UpdateJobSeekerComponent
      },
      {
        path: 'update-new-jobSeeker',
        component: UpdateNewJobSeekerComponent
      },
      {
        path: 'view-update-jobSeeker',
        component: ViewUpdateJobSeekerComponent
      },
      {
        path: 'view-jobSeeker',
        component: ViewJobSeekerComponent
      },
      {
        path: 'career-resource-centre',
        component: CareerResourceCentreComponent
      },
      {
        path: 'update-employeer',
        component: UpdateEmployeerComponent
      },
      {
        path: 'schedule',
        component: SchedularComponent
      },
      {
        path: 'holidays',
        component: HolidaysComponent
      },
      {
        path: 'view-job',
        component: JobViewComponent
      },
      {
        path: 'jobs-pr-po',
        component: JobsPrPoComponent
      },
      {
        path: 'profile-list',
        component: ProfileListComponent
      },
      {
        path: 'organization-list',
        component: OrganizationListComponent
      },
      {
        path: 'jobSeeker-list',
        component: JobSeekerListComponent
      },
      {
        path: 'unassigned-list',
        component: UnAssignedListComponent
      },
      {
        path: 'all-jobs',
        component: AllJobsComponent
      },
      {
        path: 'completed-list',
        component: CompletedListComponent
      },
      // new path
      {
        path: 'WalletComponent',
        component: WalletComponent
      },
      {
        path: 'ViewJobSeekerPoComponent',
        component: ViewJobSeekerPoComponent
      },
      {
        path: 'bulk-dataUpload',
        component: BulkDataUploadComponent
      },
      {
        path: 'ProfileSearchComponent',
        component: ProfileSearchComponent
      },
      // end here
      {
        path: 'rejected-list',
        component: RejectedListComponent
      },
      {
        path: 'bulk-candidate-upload',
        component: BulkCandidateDataUploadComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: '',
        redirectTo: localStorage.getItem('role') != null ? localStorage.getItem('role').match(ConstantsGlobal.poAdmin) ? 'dashboard-Universal'
          : localStorage.getItem('role').match(ConstantsGlobal.poTeamLead) ? 'dashboard-Universal'
            : localStorage.getItem('role').match(ConstantsGlobal.employeer) ? 'employer-dashboard'
            : localStorage.getItem('role').match(ConstantsGlobal.saleOfficer) ? 'kamayi-sales-dashboard'
              : localStorage.getItem('role').match(ConstantsGlobal.po) ? 'dashboard-Universal'
                : localStorage.getItem('role').match(ConstantsGlobal.admin) ? 'admin-dashboard'
                  : 'job-seeker-dashboard' : 'login',
        pathMatch: 'full',
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}


