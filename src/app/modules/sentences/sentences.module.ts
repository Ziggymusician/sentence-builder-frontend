import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Containers
import { SentencesComponent } from './containers/sentences/sentences.component';
import { NewSentenceComponent } from './containers/new-sentence/new-sentence.component';
import { SentenceCardComponent } from './components/sentence-card/sentence-card.component';
import { SentenceFormComponent } from './components/sentence-form/sentence-form.component';

const routes: Routes = [
  { path: '', component: SentencesComponent, pathMatch: 'full' },
  { path: 'new', component: NewSentenceComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    SentencesComponent,
    NewSentenceComponent,
    SentenceCardComponent,
    SentenceFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class SentencesModule {}
