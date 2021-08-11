import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './OpenDataMapAir/map/map.component';
import { TestComponent } from './OpenDataMapAir/test/test.component';


const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'test', component: TestComponent },
  { path: '*', component: MapComponent },
  { path:'',redirectTo:'map',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
