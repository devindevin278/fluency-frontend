import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { Router } from '@angular/router';
import { InfluencerService } from '../../services/influencer.service';

@Component({
  selector: 'app-influencer-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './influencer-card.component.html',
  styleUrl: './influencer-card.component.css'
})
export class InfluencerCardComponent{

  constructor(
    private router: Router,
    private influencerService: InfluencerService
  ) {
  }


  // INI INFLUENCER
  @Input() item!: any;

  getProfilePictureUrl(profilePicture: string): string {
    return profilePicture.replace(/\\"/g, ''); // Menghapus karakter escape
  }

  // buat emit influencer id
  hireClicked = output<any>();
  redirectToProject() {
    this.hireClicked.emit(this.item['influencer_id']);
  }

  // Fungsi untuk toggle status saved
  toggleSave(influencerUserId: number) {
    this.item.issaved = !this.item.issaved;

    if (this.item.issaved) {
      // Kirim data ke backend hanya jika influencer disimpan
      this.influencerService.saveInfluencer(influencerUserId).subscribe(
        response => {
          console.log('Influencer saved successfully:', response);
        },
        error => {
          console.error('Error saving influencer:', error);
          this.item.issaved = false;
        }
      );
    } else{
      this.influencerService.unsaveInfluencer(influencerUserId).subscribe(
        response => {
          console.log('Influencer unsaved successfully:', response);
        },
        error => {
          console.error('Error unsaving influencer:', error);
          this.item.issaved = true;
        }
      );
    }
  }




}
