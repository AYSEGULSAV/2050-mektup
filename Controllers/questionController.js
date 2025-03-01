const question=require('./../Models/questions');

  //Soruları veritabanına kaydetme fonksiyonu

exports.addQuestions=async(req,res)=>{
    const questions = [
        { questionText: 'Karbon ayak izini hesaplamak için hangi faktörler dikkate alınır?', options: ['Enerji tüketimi', 'Yiyecek tüketimi', 'Her ikisi de'], correctAnswer: 'Her ikisi de' },
        { questionText: 'Süper yeşil bina tasarımı nedir?', options: ['Yüksek enerji verimliliği sağlayan binalar', 'Sıfır karbon emisyonu ile yapılan binalar', 'İnsan sağlığını iyileştiren binalar'], correctAnswer: 'Yüksek enerji verimliliği sağlayan binalar' },
        { questionText: 'Hangi sera gazı, okyanus asidifikasyonuna yol açan ana etkenlerden biridir?', options: ['Karbon dioksit', 'Metan', 'Azot oksit'], correctAnswer: 'Karbon dioksit' },
        { questionText: 'Düşük karbonlu enerji sistemlerine geçişi hızlandırmanın en önemli engellerinden biri nedir?', options: ['Sosyal kabul', 'Yüksek maliyetler', 'Teknolojik yetersizlikler'], correctAnswer: 'Yüksek maliyetler' },
        { questionText: 'Biyomimikri nedir?', options: ['Doğal sistemleri taklit ederek sürdürülebilir çözümler geliştirme', 'Yapay fotosentezle enerji üretme', 'Biyolojik çeşitliliği koruma amaçlı projeler oluşturma'], correctAnswer: 'Doğal sistemleri taklit ederek sürdürülebilir çözümler geliştirme' },
        { questionText: 'Sıfır atık hareketinin temel amacı nedir?', options: ['Atık üretimini azaltmak ve kaynakları verimli kullanmak', 'Daha fazla geri dönüşüm yapmak', 'Daha fazla plastik üretmek'], correctAnswer: 'Atık üretimini azaltmak ve kaynakları verimli kullanmak' },
        { questionText: 'Sürdürülebilir kalkınma amacıyla kullanılan "doğal kapital" terimi neyi ifade eder?', options: ['Doğal kaynakların ekonomik değeri', 'Doğal kaynakları koruma stratejileri', 'Fosil yakıtların yerini alacak enerji kaynakları'], correctAnswer: 'Doğal kaynakların ekonomik değeri' },
        { questionText: 'Karbon kredisi nedir?', options: ['Bir şirketin karbon emisyonunu dengelemek için satın aldığı hak', 'Biyolojik çeşitliliği artıran proje desteği', 'Fosil yakıtları kullanmayı teşvik eden bir program'], correctAnswer: 'Bir şirketin karbon emisyonunu dengelemek için satın aldığı hak' },
        { questionText: 'Çevre dostu organik tarımın, geleneksel tarıma göre en belirgin farkı nedir?', options: ['Kimyasal gübre ve pestisitlerin kullanılmaması', 'Yüksek verimlilik elde edilmesi', 'Monokültür tarımı uygulanması'], correctAnswer: 'Kimyasal gübre ve pestisitlerin kullanılmaması' },
        { questionText: 'Çevre dostu ulaşım araçları arasında hangisi daha az enerji tüketir?', options: ['Elektrikli araçlar', 'Benzinli araçlar', 'Hidrojenle çalışan araçlar'], correctAnswer: 'Elektrikli araçlar' },
        { questionText: 'Hangi enerji kaynağı, hidrojenin depolanması ve taşınması açısından en verimli olanıdır?', options: ['Rüzgar enerjisi', 'Nükleer enerji', 'Hidroelektrik enerji'], correctAnswer: 'Hidroelektrik enerji' },
        { questionText: 'Geotermal enerji üretiminde hangi doğal kaynak kullanılır?', options: ['Yer altı suyu ve buhar', 'Güneş ışığı', 'Rüzgar hızı'], correctAnswer: 'Yer altı suyu ve buhar' },
        { questionText: 'Karbonsuzlaşma süreci, hangi stratejileri içerir?', options: ['Fosil yakıt kullanımını azaltmak', 'Yenilenebilir enerji kaynaklarına geçiş', 'Her ikisi de'], correctAnswer: 'Her ikisi de' },
        { questionText: 'Net sıfır emisyon hedefine ulaşmak için hangi alanlarda en büyük ilerlemeyi sağlamak gerekir?', options: ['Ulaşım ve enerji', 'Gıda ve tarım', 'Biyolojik çeşitlilik ve ormanlar'], correctAnswer: 'Ulaşım ve enerji' },
        { questionText: 'Hangi ülke, en yüksek miktarda yenilenebilir enerji kullanımı oranına sahiptir?', options: ['Almanya', 'İzlanda', 'Çin'], correctAnswer: 'İzlanda' },
        { questionText: 'Karbonsuzlaştırma sürecinin en temel hedeflerinden biri nedir?', options: ['Hava kirliliğini artırmak', 'Biyolojik çeşitliliği yok etmek', 'Karbon salınımını azaltmak'], correctAnswer: 'Karbon salınımını azaltmak' },
        { questionText: 'Biyolojik çeşitliliği korumanın ulusal ekonomi üzerindeki olası etkisi nedir?', options: ['Ekonomiyi olumsuz etkiler', 'Tarım ve turizm sektörlerini güçlendirir', 'Dış borçlanmayı artırır'], correctAnswer: 'Tarım ve turizm sektörlerini güçlendirir' },
        { questionText: 'Tuzlu su ekosistemlerinin sağlığı üzerinde insan faaliyetlerinin olumsuz etkileri nelerdir?', options: ['Biyolojik çeşitliliği artırmak', 'Ağır metallerin birikmesi ve habitat kaybı', 'Okyanus akıntılarının hızlanması'], correctAnswer: 'Ağır metallerin birikmesi ve habitat kaybı' },
        { questionText: 'Verimli enerji kullanımı ile ilgili olarak en yaygın stratejilerden biri nedir?', options: ['Yüksek enerji tüketimi sağlamak', 'Enerji geri kazanımı uygulamak', 'Biyokütle kullanımı artırmak'], correctAnswer: 'Enerji geri kazanımı uygulamak' },
        { questionText: 'İklim değişikliğiyle mücadelede hangi strateji daha etkili olabilir?', options: ['Fosil yakıt kullanımını artırmak', 'Ormanların korunması ve genişletilmesi', 'Daha fazla su kaynağı kullanmak'], correctAnswer: 'Ormanların korunması ve genişletilmesi' },
        { questionText: 'Hangi gaz atmosferdeki sera etkisini en çok artırır?', options: ['Metan', 'Karbon dioksit', 'Azot oksit'], correctAnswer: 'Metan' },
        { questionText: 'Daha yeşil binaların inşasında hangi malzemeler tercih edilir?', options: ['Çelik ve beton', 'Ahşap ve geri dönüştürülmüş malzemeler', 'Plastik ve cam'], correctAnswer: 'Ahşap ve geri dönüştürülmüş malzemeler' },
        { questionText: 'Enerji verimliliğini artırmak amacıyla kullanılan pasif ev tasarımı nedir?', options: ['Yüksek enerji tüketimi sağlayan yapılar', 'Isı kaybını minimuma indiren yapılar', 'Sadece güneş enerjisi kullanan yapılar'], correctAnswer: 'Isı kaybını minimuma indiren yapılar' },
        { questionText: 'Hangi enerji kaynağı, sürdürülebilir enerji için en fazla potansiyele sahiptir?', options: ['Güneş enerjisi', 'Hidroelektrik enerji', 'Rüzgar enerjisi'], correctAnswer: 'Güneş enerjisi' },
        { questionText: 'Küresel ısınma ile mücadelede hangi tür tarım uygulamaları daha sürdürülebilirdir?', options: ['Monokültür tarımı', 'Organik tarım', 'Geleneksel tarım uygulamaları'], correctAnswer: 'Organik tarım' },
        { questionText: 'Aşağıdaki hangi önlem, deniz seviyesinin yükselmesini yavaşlatabilir?', options: ['Sera gazlarını azaltmak', 'Plastik atıkları artırmak', 'Ormanları yok etmek'], correctAnswer: 'Sera gazlarını azaltmak' },
        { questionText: 'Biyolojik çeşitliliği korumanın en büyük yararlarından biri nedir?', options: ['Doğal afetleri artırmak', 'Tarım ve ilaç üretimini sağlamak', 'Ekosistem hizmetlerini sürdürülebilir kılmak'], correctAnswer: 'Ekosistem hizmetlerini sürdürülebilir kılmak' },
        { questionText: 'Sosyal açıdan sürdürülebilirlik neyi hedefler?', options: ['Biyolojik çeşitliliği yok etmek', 'Toplumsal eşitsizliği artırmak', 'İnsana ve topluma fayda sağlamak'], correctAnswer: 'İnsana ve topluma fayda sağlamak' },
        { questionText: 'Karbonsuzlaştırma stratejileri arasında hangisi doğrudan çevresel etki yaratır?', options: ['Yenilenebilir enerji kaynaklarına geçiş', 'Karbon kredisi alımı', 'Sosyal eşitsizliği artırmak'], correctAnswer: 'Yenilenebilir enerji kaynaklarına geçiş' },
        { questionText: 'Hangi fosil yakıt, en fazla metan gazı salınımına neden olur?', options: ['Kömür', 'Petrol', 'Doğal gaz'], correctAnswer: 'Doğal gaz' },
        { questionText: 'Aşağıdaki hangi seçenek, karbon ayak izini en fazla azaltan ulaştırma aracıdır?', options: ['Benzinli araba', 'Elektrikli araba', 'Hafif raylı sistem'], correctAnswer: 'Elektrikli araba' },
        { questionText: 'Aşağıdakilerden hangisi, su kaynaklarının sürdürülebilir kullanımını tehdit eder?', options: ['Yer altı suyu seviyelerinin düşmesi', 'Yağmur ormanlarının korunması', 'Güneş enerjisi kullanımı'], correctAnswer: 'Yer altı suyu seviyelerinin düşmesi' },
        { questionText: 'Hangi tarım uygulaması, toprak erozyonunu en fazla hızlandırır?', options: ['Monokültür tarımı', 'Sürdürülebilir tarım', 'Permakültür'], correctAnswer: 'Monokültür tarımı' },
        { questionText: 'Aşağıdakilerden hangisi küresel ısınmanın etkilerini daha fazla artırabilir?', options: ['Karbon salınımını azaltmak', 'Hızlı kentleşme', 'Su kaynaklarını korumak'], correctAnswer: 'Hızlı kentleşme' },
        { questionText: 'Aşağıdaki hangi faktör, denizlerin asidifikasyonunu hızlandıran bir faktördür?', options: ['Karbondioksit salınımı', 'Ozon tabakasının incelmesi', 'Plastik atıkların artması'], correctAnswer: 'Karbondioksit salınımı' },
        { questionText: 'Aşağıdaki hangi seçenek, biyoçeşitliliğin yok olmasına neden olan faktörlerden biridir?', options: ['Biyolojik çeşitliliği desteklemek', 'Sıcak hava dalgaları', 'Korunan alanlar oluşturmak'], correctAnswer: 'Sıcak hava dalgaları' },
        { questionText: 'İklim değişikliğiyle mücadelede en etkili strateji nedir?', options: ['Yenilenebilir enerjiye geçişi hızlandırmak', 'Fosil yakıtları daha fazla kullanmak', 'Plastik kullanımını arttırmak'], correctAnswer: 'Yenilenebilir enerjiye geçişi hızlandırmak' },
        { questionText: 'Aşağıdaki hangi organik madde, karbon salınımını azaltmaya yardımcı olabilir?', options: ['Biyokütle enerjisi', 'Fosil yakıtlar', 'Plastik atıklar'], correctAnswer: 'Biyokütle enerjisi' },
        { questionText: 'Aşağıdaki enerji türlerinden hangisi, en fazla su tüketimine neden olur?', options: ['Hidroelektrik enerji', 'Termik enerji', 'Rüzgar enerjisi'], correctAnswer: 'Hidroelektrik enerji' },
        { questionText: 'Aşağıdakilerden hangisi karbon emilimini artırmaya yönelik bir yöntemdir?', options: ['Ormanların tahrip edilmesi', 'Yeniden ağaçlandırma', 'Sıfır atık uygulaması'], correctAnswer: 'Yeniden ağaçlandırma' },
        { questionText: 'Aşağıdaki hangi seçenek, asidik yağmurun oluşmasına katkıda bulunmaz?', options: ['Fosil yakıtların yanması', 'Kimyasal gübrelerin kullanımı', 'Yenilenebilir enerji kullanımı'], correctAnswer: 'Yenilenebilir enerji kullanımı' },
        { questionText: 'Aşağıdaki hangi biyolojik madde, küresel ısınmanın etkilerini azaltmada rol oynar?', options: ['Karbon dioksit', 'Metan', 'Biyolojik çeşitlilik'], correctAnswer: 'Biyolojik çeşitlilik' },
        { questionText: 'Aşağıdaki hangi enerji kaynağı, diğerlerine göre en düşük çevresel etkiye sahiptir?', options: ['Hidroelektrik enerji', 'Güneş enerjisi', 'Kömür'], correctAnswer: 'Güneş enerjisi' },
        { questionText: 'Karbonsuzlaşma süreci hangi sektörde en etkili şekilde uygulanabilir?', options: ['Tarım', 'Ulaşım', 'Sanayi'], correctAnswer: 'Ulaşım' },
        { questionText: 'Sera gazlarının en fazla salındığı ülke hangisidir?', options: ['Çin', 'Amerika Birleşik Devletleri', 'Hindistan'], correctAnswer: 'Çin' },
        { questionText: 'Aşağıdakilerden hangisi deniz ekosistemlerine zarar veren bir faktördür?', options: ['Balıkçılığın kontrol edilmesi', 'Deniz kirliliği', 'Biyolojik çeşitliliğin korunması'], correctAnswer: 'Deniz kirliliği' },
        { questionText: 'Aşağıdaki hangi teknoloji, fosil yakıtların yerine enerji üretiminde en verimli alternatif olabilir?', options: ['Jeotermal enerji', 'Rüzgar enerjisi', 'Kömür'], correctAnswer: 'Rüzgar enerjisi' },
        { questionText: 'Yenilenebilir enerji kaynaklarından hangisi, en fazla arazi kullanımı gerektirir?', options: ['Güneş enerjisi', 'Jeotermal enerji', 'Rüzgar enerjisi'], correctAnswer: 'Rüzgar enerjisi' },
        { questionText: 'Aşağıdaki hangi seçenek, gıda üretimi için daha sürdürülebilir bir yöntemdir?', options: ['Monokültür tarımı', 'Sera gazı salınımını artırmak', 'Organik tarım'], correctAnswer: 'Organik tarım' },
        { questionText: 'Aşağıdaki hangi faktör, orman yangınlarını artırabilir?', options: ['Biyolojik çeşitliliği korumak', 'Küresel ısınma', 'Doğal afetlerin azalması'], correctAnswer: 'Küresel ısınma' },
        { questionText: 'Aşağıdakilerden hangisi, su kaynaklarının tükenmesini engellemeye yönelik bir stratejidir?', options: ['Su tasarrufu sağlamak', 'Suyu daha fazla kirletmek', 'Daha fazla su tüketmek'], correctAnswer: 'Su tasarrufu sağlamak' },
        { questionText: 'Aşağıdaki hangi seçenek, çevre dostu olmayan bir uygulamadır?', options: ['Yenilenebilir enerji kullanımı', 'Kimyasal gübre kullanımı', 'Elektrikli araç kullanımı'], correctAnswer: 'Kimyasal gübre kullanımı' },
        { questionText: 'Aşağıdakilerden hangisi okyanusların asidifikasyonunu artıran bir faktördür?', options: ['Plastik atıklar', 'Fosil yakıtların yakılması', 'Yenilenebilir enerji kullanımı'], correctAnswer: 'Fosil yakıtların yakılması' },
        { questionText: 'Aşağıdaki hangi seçenek, en verimli enerji üretimi için kullanılan kaynağı temsil eder?', options: ['Jeotermal enerji', 'Kömür', 'Doğal gaz'], correctAnswer: 'Jeotermal enerji' },
        { questionText: 'Aşağıdaki hangi faktör, karbon salınımını azaltmaya yardımcı olabilir?', options: ['Fosil yakıtlar', 'Elektrikli araçlar', 'Biyolojik çeşitliliği yok etmek'], correctAnswer: 'Elektrikli araçlar' },
        { questionText: 'Aşağıdaki hangi uygulama, su kaynaklarının korunmasına yardımcı olabilir?', options: ['Sürekli su tüketimi', 'Yağmur suyunun toplanması', 'Plastik kullanımı artırmak'], correctAnswer: 'Yağmur suyunun toplanması' },
        { questionText: 'Aşağıdaki hangi seçenek, çevre dostu bir enerji kaynağıdır?', options: ['Doğal gaz', 'Kömür', 'Hidroelektrik enerji'], correctAnswer: 'Hidroelektrik enerji' },
        { questionText: 'Sera gazı salınımını en fazla azaltan sektör hangisidir?', options: ['Tarım', 'Ulaşım', 'Sanayi'], correctAnswer: 'Ulaşım' },
        { questionText: 'Aşağıdaki hangi faktör, toprak verimliliğini artırmaya yardımcı olabilir?', options: ['Monokültür tarımı', 'Organik tarım', 'Kimyasal gübreler'], correctAnswer: 'Organik tarım' },
        { questionText: 'Aşağıdaki hangi enerji kaynağı, suya en az zarar verir?', options: ['Hidroelektrik enerji', 'Rüzgar enerjisi', 'Jeotermal enerji'], correctAnswer: 'Rüzgar enerjisi' },
        { questionText: 'Aşağıdaki hangi seçenek, sürdürülebilir gıda üretimi için en doğru yöntemdir?', options: ['İçme suyu kullanımı', 'İleri teknoloji kullanımı', 'Yerel tarım uygulamaları'], correctAnswer: 'Yerel tarım uygulamaları' },
        { questionText: 'Aşağıdaki hangi seçenek, küresel ısınmayı engellemek için atılacak en önemli adımdır?', options: ['Plastik kullanımı artırmak', 'Yenilenebilir enerji kullanımı', 'Fosil yakıtları teşvik etmek'], correctAnswer: 'Yenilenebilir enerji kullanımı' }
    ];
    
    try{
        await question.insertMany(questions);
        res.status(200).send('Sorular başarıyla eklendi');

    }catch(err){
         res.status(500).send('Sorular eklenirken bir hata oluştu' +err.message);

    }
    
   }

   exports.getRandomQuestions=async(req,res)=>{
    try{
        const questions = await question.aggregate([{ $sample: { size: 20 } }]);//rastgele 20 soru
        res.json({
            count:questions.length,
            questions:questions
        });

    }catch(err){
        res.status(500).json({error:"Sorular alınırken hata oluştu"});

    }
   }