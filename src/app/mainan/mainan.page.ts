import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainan',
  templateUrl: './mainan.page.html',
  styleUrls: ['./mainan.page.scss'],
})
export class MainanPage implements OnInit {
  dataMainan: any;
  modalTambah: any;
  id: any;
  namaMainan: any;
  deskripsi: any;
  modalEdit: any;
  namaUser: any;

  resetModal() {
    this.id = null;
    this.namaMainan = '';
    this.deskripsi = '';
  }
  
  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalTambah = true;
    this.modalEdit = false;
  }

  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilMainan(this.id);
    this.modalTambah = false;
    this.modalEdit = true;
  }

  cancel() {
    this.modal.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  constructor(private api: ApiService, private modal: ModalController, private alertController: AlertController, private authService: AuthenticationService, private router: Router) { this.namaUser = this.authService.nama }

  ngOnInit() {
    this.getMainan();
  }

  getMainan() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataMainan = res.filter((item: any) => 
          item && item.nama && item.deskripsi && 
          item.nama.trim() !== '' && item.deskripsi.trim() !== ''
        );
      },
      error: (err: any) => {
        console.log('Error:', err);
        this.alertController.create({
          header: 'Error',
          message: 'Gagal mengambil data: ' + err.message,
          buttons: ['OK']
        }).then(alert => alert.present());
      },
    });
  }

  async konfirmasiHapus(id: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin ingin menghapus data ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            console.log('Hapus dibatalkan');
          }
        }, {
          text: 'Ya',
          handler: () => {
            this.hapusMainan(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async tambahMainan() {
    if (this.namaMainan != '' && this.deskripsi != '') {
      let data = {
        nama: this.namaMainan,
        deskripsi: this.deskripsi,
      }
      this.api.tambah(data, 'tambah.php')
        .subscribe({
          next: async (hasil: any) => {
            this.modalTambah = false;
            this.modal.dismiss();
            this.resetModal();
            await new Promise(resolve => {
              this.getMainan();
              resolve(true);
            });

            const alert = await this.alertController.create({
              header: 'Sukses',
              message: `Data Mainan ${this.namaMainan} berhasil ditambahkan`,
              buttons: ['OK']
            });
  
            await alert.present();
          },
          error: async (err: any) => {
            console.log('gagal tambah mainan');

            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Gagal menambahkan data mainan',
              buttons: ['OK']
            });
  
            await alert.present();
          }
        })
    } else {
      const alert = await this.alertController.create({
        header: 'Peringatan',
        message: 'Nama dan deskripsi harus diisi',
        buttons: ['OK']
      });
  
      await alert.present();
      console.log('gagal tambah mainan karena masih ada data yg kosong');
    }
  }

  hapusMainan(id: any) {
    this.api.hapus(id,
      'hapus.php?id=').subscribe({
        next: (res: any) => {
          console.log('sukses', res);
          this.getMainan();
          console.log('berhasil hapus data');
        },
        error: (error: any) => {
          console.log('gagal');
        }
      })
  }

  ambilMainan(id: any) {
    this.api.lihat(id,
      'lihat.php?id=').subscribe({
        next: (hasil: any) => {
          console.log('sukses', hasil);
          let mainan = hasil;
          this.id = mainan.id;
          this.namaMainan = mainan.nama;
          this.deskripsi = mainan.deskripsi;
        },
        error: (error: any) => {
          console.log('gagal ambil data');
        }
      })
  }

  async editMainan() {
    if (this.namaMainan != '' && this.deskripsi != '') {
      let data = {
        id: this.id,
        nama: this.namaMainan,
        deskripsi: this.deskripsi
      }
      this.api.edit(data, 'edit.php')
        .subscribe({
          next: async (hasil: any) => {
            console.log(hasil);
            this.resetModal();
            this.getMainan();
            console.log('berhasil edit Mainan');
            this.modalEdit = false;
            this.modal.dismiss();

            const alert = await this.alertController.create({
              header: 'Sukses',
              message: `Data mainan ${this.namaMainan} berhasil diubah`,
              buttons: ['OK']
            });
  
            await alert.present();
          },
          error: async (err: any) => {
            console.log('gagal edit Mainan');
            
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Gagal mengubah data mainan',
              buttons: ['OK']
            });
  
            await alert.present();
          }
        })
    } else {
      const alert = await this.alertController.create({
        header: 'Peringatan',
        message: 'Nama dan deskripsi harus diisi',
        buttons: ['OK']
      });
  
      await alert.present();
      console.log('gagal edit mainan karena masih ada data yg kosong');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}