    // main 商品卡片 template 模板
    const products = [
        {
            id:'hiking-1-Laugavegur-Trail',
            img: './src/img/product-img-1.png',
            imgBig: './src/img/product-big-img-1.png',
            title: 'Laugavegur Trail',
            price: 100,
            brief: 'South',
            briefLong: 'The Laugavegur Trail is one of Iceland’s most famous hiking routes, stretching from the Landmannalaugar region to Þórsmörk. Known for its diverse landscapes, it features hot springs, colorful rhyolite mountains, glaciers, and vast lava fields.',
            aboutTheTour: 'Embark on an unforgettable adventure along the Laugavegur Trail. This tour will take you through Iceland’s iconic landscapes, where you’ll experience the incredible variety of terrain, including geothermal hot springs, volcanic craters, and lush valleys. As you hike, our knowledgeable guides will share insights into the area’s geology, flora, and history, offering you a deeper connection to this stunning natural wonder.',
            quantity: 1,
            duration: '4 days and 3 nights',
            time: 'Approximately 6–8 hours of hiking per day',
            startTime: '8:00 AM on the first day',
            location: 'Landmannalaugar (Starting Point)',
            meetingTime: '30 minutes before the tour starts',
            groupSize: 12,
            beforeYouGo: `
            <li>Pack appropriate clothing for changing weather conditions, including waterproof layers and warm gear.</li>
            <li>Bring a durable backpack, trekking poles, and a refillable water bottle.</li>
            <li>Ensure you have enough snacks and lightweight meals for the journey, as there are no food stops along the trail.</li>
            <li>Inform someone of your itinerary before starting the trek.</li>
            <li>If you require vegetarian or special meal options, please specify during booking.</li>
            `,
            rules: `
            <li>This tour is not suitable for beginners; participants should have prior hiking experience.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;12 participants to maintain safety and group cohesion.</li>
            <li>Children under 16 and individuals with serious health conditions are not recommended to join this trek.</li>
            <li>All participants must sign a liability waiver before departure.</li>
            <li>The schedule may change due to weather conditions. If the trek is canceled due to severe weather, participants can choose between a full refund or rescheduling.</li>
            <li>Please follow the guide’s instructions at all times to ensure safety.</li>
            `,

        },
        {
            id:'hiking-2-Hornstrandir-Nature-Reserve',
            img: './src/img/product-img-2.png',
            imgBig: './src/img/product-big-img-2.png',
            title: 'Hornstrandir Nature Reserve',
            price: 20,
            brief: 'West',
            briefLong: 'Located in the Westfjords of Iceland, it is an untouched wilderness paradise known for its stunning fjords, rugged mountains, and diverse wildlife, especially Arctic foxes.',
            aboutTheTour: 'Discover the hidden gem of Iceland’s Westfjords—Hornstrandir Nature Reserve. During this tour, you will hike through the reserve\'s stunning landscapes, enjoy panoramic ocean views, and learn about the area\'s rich history and culture from our expert guide.',
            quantity: 1,
            duration: '8 hours (including round-trip transportation)',
            time: 'Approximately 4 hours',
            startTime: '8:00 AM',
            location: 'The main dock in Ísafjörður town center',
            meetingTime: '15 minutes before the tour starts',
            groupSize: 8,
            beforeYouGo: `<li>Wear waterproof clothing and sturdy hiking boots with good traction.</li>
            <li>Bring plenty of water and snacks.</li>
            <li>Note that there is no mobile signal during the tour; inform family or friends of your plans beforehand.</li>
            <li>If you have any special dietary requirements, please specify them during booking.</li>`,
            rules: `<li>This tour is not recommended for children under 12.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The tour is limited to 8 participants to ensure an intimate and personalized experience.</li>
            <li>Not suitable for pregnant individuals or those with cardiovascular conditions.</li>
            <li>All participants are required to sign a liability waiver before joining the tour.</li>
            <li>The schedule may be subject to change or cancellation due to weather conditions. If the tour is canceled due to severe weather, we will offer a full refund or an alternative date.</li>`,
        },
        {
            id:'hiking-3-Skaftafell-Glacier-Hikes',
            img: './src/img/product-img-3.png',
            imgBig: './src/img/product-big-img-3.png',
            title: 'Skaftafell Glacier Hikes',
            price: 18,
            brief: 'South',
            briefLong: 'Skaftafell, located within Vatnajökull National Park, is known for its spectacular glaciers, breathtaking ice formations, and scenic mountain landscapes. The area offers a variety of hiking trails suitable for all levels of adventurers.',
            aboutTheTour: 'Embark on a thrilling adventure in the heart of Vatnajökull National Park with our Skaftafell Glacier Hike. During this tour, you will explore the massive glaciers, trek across ice-covered terrain, and marvel at the stunning ice formations. Our expert guides will lead you through the glacier’s fascinating features, providing insights into the region’s unique geology and the forces that shaped this icy wonderland.',
            quantity: 1,
            duration: '6 hours (including round-trip transportation)',
            time: 'Approximately 3.5 hours',
            startTime: '9:00 AM',
            location: 'Skaftafell National Park Visitor Center',
            meetingTime: '20 minutes before the tour starts',
            groupSize: 12,
            beforeYouGo: `<li>Wear warm, waterproof clothing and sturdy hiking boots with good grip.</li>
            <li>Bring plenty of water, snacks, and a camera to capture the stunning views.</li>
            <li>Note that there is limited mobile signal in the area, so make sure to inform someone of your plans beforehand.</li>
            <li>If you have any dietary restrictions, please let us know at the time of booking.</li>`,
            rules: `<li>This tour is not recommended for children under 10 years old.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The group size is limited to 12 participants to ensure a more personalized experience.</li>
            <li>Not suitable for individuals with mobility impairments or severe medical conditions.</li>
            <li>All participants must sign a liability waiver before the tour begins.</li>
            <li>Tour may be canceled or modified due to weather conditions. If the tour is canceled, a full refund or an alternative date will be offered.</li>`

        },
        {
            id:'hiking-4-Ásbyrgi-Canyon-Hike',
            img: './src/img/product-img-4.png',
            imgBig: './src/img/product-big-img-4.png',
            title: 'Ásbyrgi Canyon Hike',
            price: 18,
            brief: 'North',
            briefLong: 'Ásbyrgi Canyon, located in the northern part of Iceland, is a stunning horseshoe-shaped depression surrounded by towering cliffs. Known for its unique geological features and lush vegetation, it is a serene hiking destination.',
            aboutTheTour: 'Join us for a hike through Ásbyrgi Canyon, one of Iceland’s most picturesque natural wonders. During this tour, you will walk along the canyon’s winding paths, surrounded by towering cliffs and lush greenery. Our expert guides will share the fascinating history and geology of the area, including the legend of the canyon’s creation, and introduce you to the rich wildlife that inhabits this tranquil oasis.',
            quantity: 1,
            duration: '6 hours (including round-trip transportation)',
            time: 'Approximately 3.5 hours',
            startTime: '9:00 AM',
            location: 'The Ásbyrgi Canyon Visitor Center',
            meetingTime: '15 minutes before the tour starts',
            groupSize: 10,
            beforeYouGo: `
            <li>Wear comfortable hiking boots and warm, layered clothing suitable for changing weather conditions.</li>
            <li>Bring enough water, snacks, and a packed lunch for the hike.</li>
            <li>Be prepared for uneven terrain and steep sections during the hike.</li>
            <li>If you have any allergies or medical conditions, please inform the guide ahead of time.</li>
            `,
            rules: `
            <li>This tour is not recommended for individuals with limited mobility or severe knee issues.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;This tour is limited to 10 participants to maintain a safe and enjoyable experience.</li>
            <li>Not suitable for children under 10 years old due to the challenging terrain.</li>
            <li>All participants must sign a waiver acknowledging the risks involved in the hike.</li>
            <li>The tour may be canceled or rescheduled if weather conditions are unsafe. In case of cancellation, a full refund or alternative date will be provided.</li>
            `

        },
        {
            id:'hiking-5-Jökulsárlón-Glacier-Lagoon-Boat-Tour',
            img: './src/img/product-img-5.png',
            imgBig: './src/img/product-big-img-5.png',
            title: 'Jökulsárlón Glacier Lagoon Boat Tour',
            price: 28,
            brief: 'South',
            briefLong: 'Jökulsárlón Glacier Lagoon, located in southeastern Iceland, is a breathtaking natural wonder. Known for its stunning icebergs floating in the lagoon, it offers an unforgettable view of the nearby Vatnajökull glacier.',
            aboutTheTour: 'Embark on an unforgettable boat tour of the Jökulsárlón Glacier Lagoon, where you’ll witness majestic icebergs drifting serenely in the crystal-clear waters. During this tour, you’ll glide past colossal ice formations and get a closer look at the stunning beauty of the Vatnajökull glacier. Our experienced guides will provide insight into the glacier’s history, its impact on the landscape, and the unique wildlife that inhabits the area, including seals and birds.',
            quantity: 1,
            duration: '6 hours (including round-trip transportation)',
            time: 'Approximately 3 hours',
            startTime: '10:00 AM',
            location: 'Jökulsárlón Glacier Lagoon, located along Route 1',
            meetingTime: '20 minutes before the tour starts',
            groupSize: 10,
            beforeYouGo: `<li>Wear warm, waterproof clothing and sturdy footwear with good grip.</li>
            <li>Bring a camera to capture the stunning views.</li>
            <li>Ensure your camera or phone is protected from water splashes.</li>
            <li>Note that mobile signal may be limited in the area, so inform others of your plans in advance.</li>
            <li>If you have any specific dietary needs, please inform us at the time of booking.</li>`,
            rules: `<li>This tour is not suitable for children under 10 years old.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The tour accommodates up to 10 participants for a more personalized experience.</li>
            <li>Not recommended for those with limited mobility or heart conditions.</li>
            <li>All participants must sign a liability waiver before taking part in the tour.</li>
            <li>Tour schedules may be adjusted or canceled due to extreme weather. If canceled, a full refund or alternative date will be offered.</li>`
        },
        {
            id:'hiking-6-Mývatn-Geothermal-Tour',
            img: './src/img/product-img-6.png',
            imgBig: './src/img/product-big-img-6.png',
            title: 'Mývatn Geothermal Tour',
            price: 18,
            brief: 'North',
            briefLong: 'Mývatn Geothermal and Nature Reserve, located in northeastern Iceland, is a geothermal paradise known for its unique volcanic landscapes, bubbling mud pools, and diverse birdlife, especially during the summer months.',
            aboutTheTour: 'Join us for a fascinating tour through Mývatn Geothermal and Nature Reserve, a place where nature’s raw energy is on full display. During this tour, you will explore the geothermal hot springs, fumaroles, and volcanic craters that define this region. Our expert guide will lead you through the area, explaining the geothermal processes and the history behind the formation of the landscape. You’ll also have the chance to spot the diverse bird species that thrive in the area, making it a must-see destination for nature lovers.',
            quantity: 1,
            duration: '9 hours (including round-trip transportation)',
            time: 'Approximately 5 hours',
            startTime: '9:00 AM',
            location: 'Mývatn Lake, meeting point at the parking lot near the Nature Baths',
            meetingTime: '20 minutes before the tour starts',
            groupSize: 12,
            beforeYouGo: `
            <li>Wear warm, waterproof clothing and comfortable hiking shoes.</li>
            <li>Bring a swimsuit if you plan to visit the Nature Baths.</li>
            <li>Carry a camera to capture the beautiful geothermal landscapes.</li>
            <li>Be prepared for limited mobile signal during some parts of the tour.</li>
            <li>If you have any specific dietary preferences, please inform us at the time of booking.</li>`,
            rules: `
            <li>This tour is not recommended for children under 10 years old.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The tour accommodates up to 12 participants for a more intimate and enjoyable experience.</li>
            <li>Not suitable for pregnant individuals or those with heart conditions.</li>
            <li>All participants are required to sign a liability waiver before joining the tour.</li>
            <li>The tour may be adjusted or canceled due to adverse weather conditions. If canceled, a full refund or alternative date will be offered.</li>`
        },
        {
            id:'hiking-7-Snæfellsnes-Coastal-Ecology-Walk',
            img: './src/img/product-img-7.png',
            imgBig: './src/img/product-big-img-7.png',
            title: 'Snæfellsnes Coastal Ecology Walk',
            price: 15,
            brief: 'West',
            briefLong: 'Snæfellsnes Peninsula, located in western Iceland, is known for its diverse coastal ecosystems, rugged cliffs, black sand beaches, and the iconic Snæfellsjökull volcano, which is surrounded by a rich array of plant and animal life.',
            aboutTheTour: 'Embark on a peaceful and educational walk along the stunning coastline of Snæfellsnes Peninsula. During this tour, you’ll explore dramatic cliffs, black sand beaches, and observe the diverse ecology of the area, including seabirds, marine life, and wildflowers. Our experienced guide will share fascinating insights into the region’s unique natural history and geology, as well as its connection to Icelandic folklore and mythology. This tour offers a perfect blend of nature, culture, and history, ideal for nature enthusiasts and those seeking tranquility.',
            quantity: 1,
            duration: '6 hours (including round-trip transportation)',
            time: 'Approximately 3 hours',
            startTime: '9:00 AM',
            location: 'Snæfellsnes Peninsula, meeting point at the parking lot near Arnarstapi village',
            meetingTime: '20 minutes before the tour starts',
            groupSize: 12,
            beforeYouGo: `
            <li>Wear comfortable walking shoes and weather-appropriate clothing, as conditions can change rapidly.</li>
            <li>Bring water, snacks, and a camera to capture the scenic beauty.</li>
            <li>There may be limited mobile service during the tour, so inform family or friends of your plans in advance.</li>
            <li>If you have any dietary restrictions, please inform us at the time of booking.</li>`,
            rules: `
            <li>This tour is not recommended for children under 10 years old.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The tour is limited to 12 participants to ensure a more personalized experience.</li>
            <li>Not suitable for those with mobility issues or heart conditions.</li>
            <li>All participants are required to sign a liability waiver before joining the tour.</li>
            <li>The schedule may be subject to change or cancellation due to weather conditions. In case of cancellation due to severe weather, we will offer a full refund or an alternative date.</li>`
        },
        {
            id:'hiking-8-Golden-Circle-Tour',
            img: './src/img/product-img-8.png',
            imgBig: './src/img/product-big-img-8.png',
            title: 'Golden Circle Tour',
            price: 18,
            brief: 'Southwest',
            briefLong: 'The Golden Circle is one of Iceland’s most popular tourist routes, featuring stunning natural attractions such as Þingvellir National Park, the Geysir geothermal area, and the powerful Gullfoss waterfall.',
            aboutTheTour: 'Join us for a memorable journey through the Golden Circle, where you will experience some of Iceland’s most iconic landmarks. Our tour will take you to Þingvellir National Park, a UNESCO World Heritage Site, where you can witness the rift between the Eurasian and North American tectonic plates. You’ll also visit the famous Geysir geothermal area, home to the erupting Strokkur geyser, and the breathtaking Gullfoss waterfall, where water cascades dramatically into a deep canyon. Along the way, your knowledgeable guide will provide fascinating insights into Iceland’s history, geology, and natural wonders.',
            quantity: 1,
            duration: '9 hours (including round-trip transportation)',
            time: 'Approximately 5 hours',
            startTime: '9:00 AM',
            location: 'Thingvellir National Park Visitor Center',
            meetingTime: '20 minutes before the tour starts',
            groupSize: 15,
            beforeYouGo: `
            <li>Wear warm, waterproof clothing and comfortable walking shoes.</li>
            <li>Bring a camera to capture the stunning landscapes.</li>
            <li>Ensure your phone or camera is protected from water and cold temperatures.</li>
            <li>Inform others of your plans in advance, as mobile signal may be limited in some areas.</li>
            <li>If you have any specific dietary needs, please notify us at the time of booking.</li>`,
            rules: `
            <li>This tour is not recommended for children under 8 years old.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The tour accommodates up to 15 participants to ensure a comfortable and enjoyable experience.</li>
            <li>Not suitable for those with limited mobility or severe health conditions.</li>
            <li>All participants are required to sign a liability waiver before joining the tour.</li>
            <li>The schedule may be subject to change or cancellation due to weather conditions. If the tour is canceled due to extreme weather, a full refund or alternative date will be offered.</li>`
        },
        {
            id:'hiking-9-Dalvík-Snowboarding',
            img: './src/img/product-img-9.png',
            imgBig: './src/img/product-big-img-9.png',
            title: 'Dalvík Snowboarding',
            price: 18,
            brief: 'North',
            briefLong: 'Dalvík, a charming town in northern Iceland, is renowned for its excellent snowboarding slopes, surrounded by picturesque mountains and the stunning fjords of Eyjafjörður.',
            aboutTheTour: 'Experience the thrill of snowboarding in Dalvík, one of Iceland’s best winter sports destinations. Nestled in the heart of the stunning Eyjafjörður fjord, this tour offers a variety of slopes suitable for all skill levels. Whether you’re a beginner or an experienced snowboarder, you’ll enjoy breathtaking views of the surrounding mountains and the Arctic waters. Our expert instructors will guide you through the slopes, ensuring safety and providing tips to improve your technique. After an exhilarating day on the slopes, relax and take in the unique beauty of the Northern Lights, a perfect way to end your adventure in Dalvík.',
            quantity: 1,
            duration: '6 hours (including round-trip transportation)',
            time: 'Approximately 3 hours',
            startTime: '9:00 AM',
            location: 'Dalvík Ski Resort, Dalvík, Iceland',
            meetingTime: '30 minutes before the tour starts',
            groupSize: 10,
            beforeYouGo: `<li>Wear appropriate snowboarding gear, including a waterproof jacket, pants, and gloves.</li>
            <li>Bring a helmet and any personal snowboarding equipment, though rentals are available.</li>
            <li>Ensure your phone or camera is properly protected from snow and moisture.</li>
            <li>If you have any medical conditions, please inform the guide beforehand.</li>`,
            rules: `<li>This tour is not recommended for beginners or children under 12 years old.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The tour is limited to 10 participants to ensure a personalized experience.</li>
            <li>Not suitable for pregnant individuals or those with severe joint or heart conditions.</li>
            <li>All participants must sign a liability waiver before taking part in the tour.</li>
            <li>The schedule may be subject to change or cancellation due to weather conditions. If the tour is canceled due to severe weather, a full refund or alternative date will be offered.</li>`
        },
        {
            id:'hiking-10-Westfjords-Kayaking',
            img: './src/img/product-img-10.png',
            imgBig: './src/img/product-big-img-10.png',
            title: 'Westfjords Kayaking',
            price: 12,
            brief: 'North',
            briefLong: 'The Westfjords of Iceland are a remote paradise for kayaking enthusiasts, featuring dramatic coastlines, hidden fjords, and abundant wildlife, including seals and seabirds.',
            aboutTheTour: 'Embark on a kayaking adventure through the pristine waters of the Westfjords, one of Iceland’s most secluded and untouched regions. This tour will take you along the rugged coastlines, where you’ll paddle through serene fjords, explore dramatic cliffs, and get up close to the abundant wildlife, such as seals and a variety of seabirds. With your experienced guide, you’ll navigate through calm waters, taking in the breathtaking scenery of the Westfjords’ dramatic landscapes. This tour offers a unique perspective of Iceland’s natural beauty, perfect for those seeking adventure and tranquility in one of the country’s most beautiful regions.',
            quantity: 1,
            duration: '6 hours (including round-trip transportation)',
            time: 'Approximately 3 hours',
            startTime: '9:00 AM',
            location: 'The kayaking departure point in Patreksfjörður harbor',
            meetingTime: '15 minutes before the tour starts',
            groupSize: 12,
            beforeYouGo: `<li>Wear waterproof clothing and shoes suitable for wet conditions.</li>
            <li>Bring a water bottle and light snacks to keep hydrated and energized.</li>
            <li>Be prepared for cold weather; layers are recommended.</li>
            <li>Note that mobile signal might be unavailable during the tour, so inform someone of your plans beforehand.</li>
            <li>If you have any special dietary needs, please let us know during booking.</li>`,
            rules: `<li>This tour is not recommended for children under 10 years old.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The tour is limited to 12 participants to maintain a small group experience.</li>
            <li>Not suitable for individuals with back problems, heart conditions, or limited mobility.</li>
            <li>All participants are required to sign a liability waiver before taking part in the tour.</li>
            <li>The tour may be canceled or rescheduled due to unfavorable weather conditions. If canceled, we will offer a full refund or alternative date.</li>`
        },
        {
            id:'hiking-11-Eldhestar-Horseback-Riding',
            img: './src/img/product-img-11.png',
            imgBig: './src/img/product-big-img-11.png',
            title: 'Eldhestar Horseback Riding',
            price: 20,
            brief: 'West',
            briefLong: 'Located in the heart of Iceland, Eldhestar offers a unique horseback riding experience through stunning volcanic landscapes, valleys, and rivers.',
            aboutTheTour: 'Discover the magic of Iceland on horseback with Eldhestar Horseback Riding. This tour will take you through some of the most scenic and diverse landscapes in Iceland, from volcanic terrains and rugged valleys to serene rivers. You’ll ride Icelandic horses, known for their gentle nature and unique gait, offering a comfortable and memorable experience. Your expert guide will share fascinating insights into the region’s history, geology, and wildlife as you explore the natural beauty of the Icelandic countryside. Whether you’re a seasoned rider or a beginner, this tour offers an unforgettable adventure in the heart of Iceland.',
            quantity: 1,
            duration: '5 hours (including round-trip transportation)',
            time: 'Approximately 2 hours',
            startTime: '9:00 AM',
            location: 'Eldhestar stables, located just outside Hveragerði',
            meetingTime: '20 minutes before the tour starts',
            groupSize: 10,
            beforeYouGo: `
            <li>Wear comfortable clothes suitable for horseback riding and closed-toe shoes.</li>
            <li>Bring a light jacket, as temperatures can vary during the ride.</li>
            <li>It is recommended to bring sunscreen and sunglasses for protection from the sun.</li>
            <li>Note that there is limited mobile signal in the area; inform family or friends of your plans in advance.</li>
            <li>If you have any special dietary needs or medical conditions, please notify us during booking.</li>`,
            rules: `
            <li>This tour is not suitable for children under 8 years old.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The tour is limited to 10 participants to ensure a personalized experience.</li>
            <li>Not recommended for pregnant individuals or those with severe back problems.</li>
            <li>All participants must sign a liability waiver before taking part in the tour.</li>
            <li>The tour may be canceled or adjusted due to weather conditions. In case of cancellation, a full refund or alternative date will be offered.</li>`
        },
        {
            id:'hiking-12-Vestmannaeyjar-Puffins-Viewing',
            img: './src/img/product-img-12.png',
            imgBig: './src/img/product-big-img-12.png',
            title: 'Vestmannaeyjar Puffins Viewing',
            price: 8,
            brief: 'South',
            briefLong: 'Located off the southern coast of Iceland, Vestmannaeyjar is a paradise for birdwatching enthusiasts, offering a unique opportunity to observe puffins up close in their natural habitat.',
            aboutTheTour: 'Embark on an unforgettable puffin viewing tour in Vestmannaeyjar, one of Iceland’s most iconic birdwatching destinations. During the summer months, thousands of puffins return to the islands to nest, creating a stunning display of wildlife. This tour will take you to the best viewing spots where you can observe these charming seabirds as they perch on the cliffs and soar over the waters. With the help of a knowledgeable guide, you’ll learn about the puffins’ lifecycle, their role in the local ecosystem, and the importance of conservation efforts. Whether you’re a birdwatching enthusiast or simply in awe of nature, this tour offers a rare and unforgettable experience in one of Iceland’s most beautiful settings.',
            quantity: 1,
            duration: '6 hours (including round-trip transportation)',
            time: 'Approximately 3 hours',
            startTime: '9:00 AM',
            location: 'The main harbor in Heimaey, Vestmannaeyjar',
            meetingTime: '15 minutes before the tour starts',
            groupSize: 12,
            beforeYouGo: `
            <li>Dress warmly, as temperatures can be cool even in summer.</li>
            <li>Bring binoculars or a camera with a zoom lens for the best puffin viewing experience.</li>
            <li>Wear comfortable shoes suitable for walking on rocky terrain.</li>
            <li>Be prepared for occasional sea spray, so waterproof gear is recommended.</li>
            <li>If you have any dietary restrictions, please inform us when booking.</li>`,
            rules: `
            <li>This tour is not suitable for children under 10 years old.</li>
            <li><b>Maximum Group Size:</b>&nbsp;&nbsp;The tour is limited to 12 participants to ensure an intimate experience.</li>
            <li>Not suitable for those with severe mobility issues.</li>
            <li>All participants must sign a liability waiver before joining the tour.</li>
            <li>The tour may be delayed or canceled due to weather conditions. In such cases, a full refund or rescheduled tour date will be offered.</li>`
        }
    ];