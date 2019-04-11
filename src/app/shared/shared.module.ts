import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common';
import { DatePipePipe } from '../pipes/datePipe/date-pipe.pipe';
import { ProjectModalComponent } from '../components/project-modal/project-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeamModalComponent } from '../components/team-modal/team-modal.component';
import { PopoverComponent } from '../components/popover/popover/popover.component';
import { GoJsComponent } from '../components/goJs/go-js/go-js.component';
import { MemberModalComponent } from '../components/member-modal/member-modal.component';
import { MenuPopoverComponent } from '../components/menu-popover/menu-popover.component';

@NgModule({
  declarations: [
    DatePipePipe, 
    ProjectModalComponent, 
    TeamModalComponent, 
    PopoverComponent, 
    GoJsComponent,
    MemberModalComponent,
    MenuPopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DatePipePipe,
    TeamModalComponent,
    ProjectModalComponent,
    PopoverComponent,
    GoJsComponent,
    MenuPopoverComponent,
    MemberModalComponent
  ],
  entryComponents: [
    ProjectModalComponent, 
    TeamModalComponent, 
    PopoverComponent,
    GoJsComponent,
    MemberModalComponent,
    MenuPopoverComponent
  ]
})
export class SharedModule { }
