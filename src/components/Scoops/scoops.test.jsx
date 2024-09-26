import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Scoops from ".";

/*
 ! Seçiciler
 1) Method tipi | 2)All ifadesi | 3)Seçici Method

 * get >Başlangıçta domda olan elementleri almak için kullanılır | elementi bulamazsa test başarısız olursa

 *query > elemenntin ekranda olma durumun kesin değilse kullanılır get ile benzer çalışır | element bulunmazsa null döndürür test devam eder

 *find > elementin ne zaman ekrana basılacağını belli değilse (api isteklerinde) kullanılır
 *not: find methodu promise döndürdüğünden async await ile kullanılmalı

 *Eğer methoda all ifadesi eklersek seçici koşuluna uyan bütün elemanları getirir.
 *not:all kullanılırsa dönen cevap her zaman dizi olur

*/

it("API'dan alınan veriler için ekrana kartlar basılır", async () => {
  render(<Scoops />);

  // ekrana basılan kartları al
  const images = await screen.findAllByAltText("çeşit-resim");

  // ekrandaki resimlerin (kartların) sayısı 1 den fazla mı ?
  expect(images.length).toBeGreaterThanOrEqual(1);
});

it("Çeşitlerin ekleme ve azaltma özelliklerinin toplam fiyata etkisi", async () => {
  // userventin kurlumunu yap
  const user = userEvent.setup();

  // test edilecek bileşen render edilir
  render(<Scoops />);

  // bütün ekleme ve azaltma butonlarını çağır
  const addBtns = await screen.findAllByRole("button", { name: "Ekle" });
  const delBtns = await screen.findAllByRole("button", { name: "Azalt" });

  // toplam fiyat elementini çağır
  const total = screen.getByTestId("total");

  // toplam fiyat 0 mı kontrol et
  expect(total.textContent).toBe("0");

  // chocalete'ın ekle butonuna tıkla
  await user.click(addBtns[2]);

  // toplam fiyat 20 mi kontrol et
  expect(total.textContent).toBe("20");

  // vanillanın ekle butonuna iki kez tıkla
  await user.dblClick(addBtns[1]);

  // toplam fiyat 60 mi kontrol et
  expect(total.textContent).toBe("60");

  // vanillanın azalt butonuna  tıkla
  await user.click(delBtns[1]);

  // toplam fiyat 40 mı kontrol et
  expect(total.textContent).toBe("40");

  // vanillanın azalt butonuna  tıkla
  await user.click(delBtns[1]);

  // toplam fiyat 20 mı kontrol et
  expect(total.textContent).toBe("20");

  // chocalte'ın azalt butonuna tıkla
  await user.click(delBtns[2]);

  // toplam fiyat 0 mı kontrol et
  expect(total.textContent).toBe("0");
});
