// import { Component, OnInit } from '@angular/core';
// import { PdfUploadService } from 'src/app/services/pdf-upload.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-version-history',
//   templateUrl: './version-history.component.html',
//   styleUrls: ['./version-history.component.css']
// })
// export class VersionHistoryComponent implements OnInit {
//   fileName: string;
//   versions: any[] = [];

//   constructor(private pdfService: PdfUploadService, private route: ActivatedRoute) {
//     this.fileName = this.route.snapshot.paramMap.get('fileName')!;
//   }

//   ngOnInit(): void {
//     this.getFileVersions();
//   }

//   getFileVersions() {
//     this.pdfService.getFileVersions(this.fileName).subscribe((versions) => {
//       this.versions = versions;
//     });
//   }

  

//   downloadVersion(versionId: string) {
//     this.pdfService.downloadFileVersion(this.fileName, versionId).subscribe((blob) => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `${this.fileName}-${versionId}.pdf`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { PdfUploadService } from 'src/app/services/pdf-upload.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-version-history',
  templateUrl: './version-history.component.html',
  styleUrls: ['./version-history.component.css']
})
export class VersionHistoryComponent implements OnInit {
  fileName: string = '';
  versions: { lastUpdated: string; fileUrl: string; versionId: string }[] = [];

  constructor(
    private pdfService: PdfUploadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fileName = this.route.snapshot.paramMap.get('fileName') || '';
    if (this.fileName) {
      this.getFileVersions();
    } else {
      console.error('Filename parameter is missing.');
    }
  }


  getFileVersions(): void {
    this.pdfService.getFileVersions(this.fileName).subscribe({
      next: (versions: any) => {
        this.versions = versions;
      },
      error: (err) => {
        console.error('Error fetching file versions:', err);
      }
    });
  }
  // getFileVersions(): void {
  //   this.pdfService.getFileVersions(this.fileName).subscribe({
  //     next: (versions: any[]) => {
  //       if (Array.isArray(versions)) {
  //         this.versions = versions.map((v) => ({
  //           ...v,
  //           versionId: v.versionId || v.lastUpdated // Ensure a version identifier exists
  //         }));
  //       } else {
  //         console.error('API response is not an array:', versions);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching file versions:', err);
  //     }
  //   });
  // }

  downloadVersion(versionId: string): void {
    this.pdfService.downloadFileVersion(this.fileName, versionId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.fileName}-${versionId}.pdf`
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error downloading version:', err);
      }
    });
  }
}
