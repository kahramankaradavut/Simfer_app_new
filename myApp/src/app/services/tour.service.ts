import { Injectable } from "@angular/core";
import { navigate } from "ionicons/icons";
import Shepherd from "shepherd.js";

@Injectable({
  providedIn: "root",
})
export class TourService {

  constructor() {
  }

//TAB1 PAGE TOUR FONKSİYONU

  startTourSendForm() {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: 'smooth', block: 'center' },
      }
    });

    tour.addStep({
      id: 'step1',
      text: 'Buradan yeni bir form oluşturabilirsiniz.',
      attachTo: { element: '.form-content', on: 'bottom' },
      buttons: [{ text: 'İleri', action: tour.next }]
    });

    tour.addStep({
      id: 'step2',
      text: 'Bu alana ürün kodunu girin.',
      attachTo: { element: '.form-code-input', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step3',
      text: 'Bu alana ürün türünü girin.',
      attachTo: { element: '.form-type-input', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step4',
      text: 'Burada sizin isminiz yer alır.',
      attachTo: { element: '.form-name-input', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step5',
      text: 'Buraya belirtmek istediğiniz hata açıklamasını yazabilirsiniz. (Zorunlu değildir.)',
      attachTo: { element: '.form-error-input', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step6',
      text: 'Buradan hatayı tespit ettiğiniz üretim hattını seçin.',
      attachTo: { element: '.form-band-input', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step7',
      text: 'Buradan hata miktarını seçin.',
      attachTo: { element: '.form-quantity-input', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step8',
      text: 'Buradan hata kodlarını seçebilirsiniz.',
      attachTo: { element: '.form-errorCode-input', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step9',
      text: 'Burada da hata kodlarının açıklamaları yer alır.',
      attachTo: { element: '.form-desc-input', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step10',
      text: 'Fotoğraf çekmek için buraya tıklayın.',
      attachTo: { element: '.take-photo', on: 'top' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step11',
      text: 'Çektiğiniz fotoğraflar burada görünür. Bunun için fotoğraflar yazısının sağındaki oka tıklayın. Ayrıca fotoğrafların üzerine tıklayarak büyütebilirsiniz.',
      attachTo: { element: '.photo-accordion', on: 'top' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step12',
      text: 'Formu kaydetmek için gönder butonunu kullanın.',
      attachTo: { element: '.submit-button', on: 'top' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step13',
      text: 'Hesabınızdan çıkış yapmak isterseniz çıkış butonunu kullanın.',
      attachTo: { element: '.logout-button', on: 'top' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.start();
  }

  //TAB2 PAGE TOUR FONKSİYONU
  startTourFormList() {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: 'smooth', block: 'center' },
      }
    });

    tour.addStep({
      id: 'step1',
      text: 'Buradan kaydedilen form listesine ulaşabilirsiniz.',
      attachTo: { element: '.form-list', on: 'bottom' },
      buttons: [{ text: 'İleri', action: tour.next }]
    });

    tour.addStep({
      id: 'step2',
      text: 'Burada ürünün kodu yer alır.',
      attachTo: { element: '.code-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step3',
      text: 'Burada ürünün türü yer alır.',
      attachTo: { element: '.type-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step4',
      text: 'Burada ürünün hata kodu yer alır.',
      attachTo: { element: '.error-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step5',
      text: 'Burada hata kodunun açıklaması yer alır.',
      attachTo: { element: '.desc-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step6',
      text: 'Burada hatanın detaylı açıklaması (varsa) yer alır.',
      attachTo: { element: '.detail-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step7',
      text: 'Burada hatanın miktarı yer alır.',
      attachTo: { element: '.quantity-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step8',
      text: 'Burada hatanın tespit edildiği üretim hattı yer alır.',
      attachTo: { element: '.band-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step9',
      text: 'Burada hatayı kaydeden kişinin bilgisi yer alır.',
      attachTo: { element: '.person-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step10',
      text: 'Burada ürünün şimdiki durumu (işlem yapılmadı/onarıldı/hurda) yer alır ve güncellenebilir. Güncelleme işlemini sadece yetkili kişiler yapabilir.',
      attachTo: { element: '.status-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step11',
      text: 'Burada hatalı ürüne ait görseller yer alır. Görsellere sağ tarafta bulunan ok ile ulaşabilirsiniz. Ayrıca görsellere tıklayarak büyütebilirsiniz.',  
      attachTo: { element: '.photo-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step12',
      text: 'Buradan kaydedilen formu silebilirsiniz. Silme işlemi sadece yetkili kişiler tarafından yapılabilir.', 
      attachTo: { element: '.delete-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'step13',
      text: 'Bu butondan kayıtlı olan tüm form bilgilerinin excel linkini alabilirsiniz. Excel linki sadece yetkili kişiler tarafından alınabilir.',
      attachTo: { element: '.excel-tab2', on: 'bottom' },
      buttons: [
        { text: 'Geri', action: tour.back },
        { text: 'İleri', action: tour.complete }
      ]
    });
    tour.start();

  }
  }