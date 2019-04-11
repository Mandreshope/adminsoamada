import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecruitmentDetailsPage } from './recruitment-details.page';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecruitmentDetailsPage]
})
export class RecruitmentDetailsPageModule {}
