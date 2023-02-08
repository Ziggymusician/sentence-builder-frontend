import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'sentences',
    loadChildren: () =>
      import('./modules/sentences/sentences.module').then(
        (m) => m.SentencesModule
      ),
  },
  { path: '', redirectTo: '/sentences', pathMatch: 'full' },
  { path: '**', redirectTo: '/sentences' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [AsyncPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
