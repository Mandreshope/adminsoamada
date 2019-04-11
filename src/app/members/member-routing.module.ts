import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},

  { path: 'team', loadChildren: './team/team.module#TeamPageModule' },

  { path: 'task', loadChildren: './task/task.module#TaskPageModule' },
  { path: 'task-details', loadChildren: './task/task-details/task-details.module#TaskDetailsPageModule' },
  { path: 'task-details/:id', loadChildren: './task/task-details/task-details.module#TaskDetailsPageModule' },
  { path: 'task-add', loadChildren: './task/task-add/task-add.module#TaskAddPageModule' },
  { path: 'task-edit', loadChildren: './task/task-edit/task-edit.module#TaskEditPageModule' },
  { path: 'task-edit/:id', loadChildren: './task/task-edit/task-edit.module#TaskEditPageModule' },
  { path: 'my-task', loadChildren: './task/my-task/my-task.module#MyTaskPageModule' },
  { path: 'my-task/:id', loadChildren: './task/my-task/my-task.module#MyTaskPageModule' },

  { path: 'project', loadChildren: './project/project.module#ProjectPageModule' },
  { path: 'project-add', loadChildren: './project/project-add/project-add.module#ProjectAddPageModule' },
  { path: 'project-details', loadChildren: './project/project-details/project-details.module#ProjectDetailsPageModule' },
  { path: 'project-details/:id', loadChildren: './project/project-details/project-details.module#ProjectDetailsPageModule' },
  { path: 'project-edit', loadChildren: './project/project-edit/project-edit.module#ProjectEditPageModule' },
  { path: 'project-edit/:id', loadChildren: './project/project-edit/project-edit.module#ProjectEditPageModule' },
  { path: 'my-project', loadChildren: './project/my-project/my-project.module#MyProjectPageModule' },
  { path: 'my-project/:id', loadChildren: './project/my-project/my-project.module#MyProjectPageModule' },

  { path: 'customer', loadChildren: './customer/customer.module#CustomerPageModule' },
  { path: 'customer-add', loadChildren: './customer/customer-add/customer-add.module#CustomerAddPageModule' },
  { path: 'customer-details', loadChildren: './customer/customer-details/customer-details.module#CustomerDetailsPageModule' },
  { path: 'customer-details/:id', loadChildren: './customer/customer-details/customer-details.module#CustomerDetailsPageModule' },
  { path: 'customer-edit', loadChildren: './customer/customer-edit/customer-edit.module#CustomerEditPageModule' },
  { path: 'customer-edit/:id', loadChildren: './customer/customer-edit/customer-edit.module#CustomerEditPageModule' },
  
  { path: 'team-details', loadChildren: './team/team-details/team-details.module#TeamDetailsPageModule' },
  { path: 'team-details/:id', loadChildren: './team/team-details/team-details.module#TeamDetailsPageModule' },
  { path: 'team-add', loadChildren: './team/team-add/team-add.module#TeamAddPageModule' },
  { path: 'team-edit', loadChildren: './team/team-edit/team-edit.module#TeamEditPageModule' },
  { path: 'team-edit/:id', loadChildren: './team/team-edit/team-edit.module#TeamEditPageModule' },


  { path: 'recruitment', loadChildren: './recruitment/recruitment.module#RecruitmentPageModule' },
  { path: 'recruitment-add', loadChildren: './recruitment/recruitment-add/recruitment-add.module#RecruitmentAddPageModule' },
  { path: 'recruitment-details', loadChildren: './recruitment/recruitment-details/recruitment-details.module#RecruitmentDetailsPageModule' },
  { path: 'recruitment-details/:id', loadChildren: './recruitment/recruitment-details/recruitment-details.module#RecruitmentDetailsPageModule' },
  { path: 'recruitment-edit', loadChildren: './recruitment/recruitment-edit/recruitment-edit.module#RecruitmentEditPageModule' },
  { path: 'recruitment-edit/:id', loadChildren: './recruitment/recruitment-edit/recruitment-edit.module#RecruitmentEditPageModule' },

  { path: 'contract-add', loadChildren: './customer/contract-add/contract-add.module#ContractAddPageModule' },
  { path: 'contract-edit', loadChildren: './customer/contract-edit/contract-edit.module#ContractEditPageModule' },
  { path: 'contract-edit/:id', loadChildren: './customer/contract-edit/contract-edit.module#ContractEditPageModule' },
  { path: 'contract-details', loadChildren: './customer/contract-details/contract-details.module#ContractDetailsPageModule' },
  { path: 'contract-details/:id', loadChildren: './customer/contract-details/contract-details.module#ContractDetailsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'profile-edit', loadChildren: './profile/profile-edit/profile-edit.module#ProfileEditPageModule' },

  { path: 'pert-network', loadChildren: './project/pert-network/pert-network.module#PertNetworkPageModule' },
  { path: 'pert-network/:id', loadChildren: './project/pert-network/pert-network.module#PertNetworkPageModule' },  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' }


  





 





  









];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }