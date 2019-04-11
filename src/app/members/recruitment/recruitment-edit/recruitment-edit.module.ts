import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecruitmentEditPage } from './recruitment-edit.page';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecruitmentEditPage]
})
export class RecruitmentEditPageModule {}
