import { Injectable } from "@angular/core";
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
        { text: 'Bitir', action: tour.complete }
      ]
    });

    tour.start();
  }
}