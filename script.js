// Example data array
const sampleData = [
  {
    title: "งานบุญประจำปี",
    monkName: "หลวงพ่อสมชาย",
    imgurl: "https://i.ibb.co/3r0tCz3/049f6028b7078911fe9b4fef77de8007.jpg",
    sessionDate: "2024-09-19",
    linkuri: "https://dimc.jp"
  },
  {
    title: "กิจกรรมสวดมนต์ข้ามปี",
    monkName: "พระอาจารย์มงคล",
    imgurl: "https://i.ibb.co/7G5FZmP/temple-event.jpg",
    sessionDate: "2024-12-31",
    linkuri: "https://temple-events.com"
  },
  {
    title: "ทำบุญวันพระ",
    monkName: "พระมหาบุญเพ็ง",
    imgurl: "https://i.ibb.co/1JY5Zr8/buddhist-monk.jpg",
    sessionDate: "2024-10-04",
    linkuri: "https://buddhistevents.com"
  }
];

// Function to load sample data into the form
document.getElementById('load-sample-data').addEventListener('click', function() {
  // Get random sample from array
  const randomSample = sampleData[Math.floor(Math.random() * sampleData.length)];

  // Fill the form with sample data
  document.getElementById('title').value = randomSample.title;
  document.getElementById('monkName').value = randomSample.monkName;
  document.getElementById('imgurl').value = randomSample.imgurl;
  document.getElementById('sessionDate').value = randomSample.sessionDate;
  document.getElementById('linkuri').value = randomSample.linkuri;

  console.log('Sample data loaded:', randomSample);
});

// The rest of the code remains the same for submitting and creating Flex Message
document.getElementById('flex-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form values
  const title = document.getElementById('title').value;
  const monkName = document.getElementById('monkName').value || 'ไม่มีชื่อพระ';
  const imgurl = document.getElementById('imgurl').value;
  const sessionDate = document.getElementById('sessionDate').value || 'ไม่ระบุวันที่';
  const linkuri = document.getElementById('linkuri').value;

  // Create Flex Message using form data
  const msg = createFlexMsg(title, monkName, imgurl, sessionDate, linkuri);

  // Initialize LIFF
  liff.init({ liffId: "1661018679-9E41MJJw" })
    .then(() => {
      if (liff.isApiAvailable('shareTargetPicker')) {
        liff.shareTargetPicker([msg])
          .then(res => {
            if (res) {
              console.log('Message sent successfully!');
              liff.closeWindow();
            } else {
              console.log('User canceled the operation.');
            }
          })
          .catch(error => {
            console.error('Error sending message:', error);
          });
      } else {
        alert('กรุณาเปิดบนสมาร์ทโฟน');
      }
    })
    .catch(err => {
      console.error('LIFF Initialization failed:', err);
    });
});

// Create Flex Message
function createFlexMsg(title, monkName, imgurl, sessionDate, linkuri) {
  return {
    type: "flex",
    altText: title,
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: imgurl,
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        action: {
          type: "uri",
          label: "ดูรายละเอียด",
          uri: linkuri,
        },
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: monkName,
            weight: "bold",
            size: "xl",
            margin: "md",
          },
          {
            type: "text",
            text: sessionDate,
            size: "sm",
            color: "#999999",
          },
        ],
      },
      footer: {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "เปิดดู",
              uri: linkuri,
            },
            style: "primary",
            color: "#AC390DFF",
          },
          {
            type: "button",
            action: {
              type: "uri",
              label: "แชร์ต่อ",
              uri: linkuri,
            },
            style: "primary",
          },
        ],
      },
    },
  };
}
