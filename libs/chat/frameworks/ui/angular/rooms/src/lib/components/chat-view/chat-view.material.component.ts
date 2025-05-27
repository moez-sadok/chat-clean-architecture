import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
//
import { ChatViewComponent } from './chat-view.component';

@Component({
  selector: 'cca-chat-view-mat',
  standalone: true,
  templateUrl: './chat-view.material.component.html',
  styleUrls: ['./chat-view.material.component.scss'],
  imports: [
    CommonModule,
    //Material components
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule
]
})
export class ChatViewMaterialComponent extends ChatViewComponent{}
