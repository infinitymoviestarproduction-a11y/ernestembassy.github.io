// uploader.js
const mathematicsSS1Bank = [
  {
    q: "Simplify: 2 + 3 × 4",
    o: ["20", "14", "24", "10"],
    a: 1,
    exp: "Multiply first according to BODMAS: 3 × 4 = 12, then add 2 to get 14.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is the value of 5²?",
    o: ["10", "20", "25", "15"],
    a: 2,
    exp: "5² means 5 multiplied by itself: 5 × 5 = 25.",
    subject: "mathematics-ss1"
  },
  {
    q: "Solve: 2x = 10",
    o: ["2", "3", "5", "8"],
    a: 2,
    exp: "Divide both sides of the equation by 2: x = 10 / 2 → x = 5.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is ½ + ½?",
    o: ["1", "2", "3", "¼"],
    a: 0,
    exp: "Two halves make one whole: ½ + ½ = 1.",
    subject: "mathematics-ss1"
  },
  {
    q: "Find the LCM of 4 and 6",
    o: ["12", "24", "18", "6"],
    a: 0,
    exp: "Multiples of 4: 4, 8, 12... Multiples of 6: 6, 12... The lowest common multiple is 12.",
    subject: "mathematics-ss1"
  },
  {
    q: "Find the HCF of 12 and 18",
    o: ["3", "6", "9", "12"],
    a: 1,
    exp: "The highest factor that divides both 12 and 18 evenly is 6.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 10% of 200?",
    o: ["10", "20", "30", "40"],
    a: 1,
    exp: "10% of 200 is calculated as (10/100) × 200 = 20.",
    subject: "mathematics-ss1"
  },
  {
    q: "Convert 0.5 to fraction",
    o: ["1/5", "1/2", "2/5", "5/10"],
    a: 1,
    exp: "0.5 is five-tenths, which simplifies down to 1/2.",
    subject: "mathematics-ss1"
  },
  {
    q: "Solve: x + 7 = 12",
    o: ["3", "5", "7", "9"],
    a: 1,
    exp: "Subtract 7 from both sides: x = 12 − 7 → x = 5.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 3 × 3 × 3?",
    o: ["9", "18", "27", "36"],
    a: 2,
    exp: "3 × 3 = 9, and 9 × 3 = 27.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is the square root of 16?",
    o: ["2", "3", "4", "8"],
    a: 2,
    exp: "The square root of 16 is 4 because 4 × 4 = 16.",
    subject: "mathematics-ss1"
  },
  {
    q: "Simplify: 6 ÷ 2(1+2)",
    o: ["1", "3", "9", "6"],
    a: 2,
    exp: "Clear brackets first: 1+2=3. Then evaluate expression from left to right: 6 ÷ 2 × 3 = 3 × 3 = 9.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 1000 ÷ 10?",
    o: ["10", "100", "1000", "1"],
    a: 1,
    exp: "1000 divided by 10 is 100.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 7 + 8?",
    o: ["14", "15", "16", "17"],
    a: 1,
    exp: "Basic addition: 7 + 8 = 15.",
    subject: "mathematics-ss1"
  },
  {
    q: "Find perimeter of a square with side 5cm",
    o: ["10cm", "15cm", "20cm", "25cm"],
    a: 2,
    exp: "Perimeter of a square = 4 × side length → 4 × 5cm = 20cm.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is area of square side 4cm?",
    o: ["8", "12", "16", "20"],
    a: 2,
    exp: "Area of a square = side × side → 4cm × 4cm = 16cm².",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 1/4 of 100?",
    o: ["20", "25", "30", "40"],
    a: 1,
    exp: "One quarter of 100 is 100 divided by 4, which is 25.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 9 × 2?",
    o: ["11", "16", "18", "20"],
    a: 2,
    exp: "Multiplication table: 9 × 2 = 18.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 15 − 7?",
    o: ["6", "7", "8", "9"],
    a: 2,
    exp: "Subtraction: 15 minus 7 leaves 8.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 20 ÷ 4?",
    o: ["2", "4", "5", "6"],
    a: 2,
    exp: "Division: 20 divided into 4 parts equals 5.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 8 × 5?",
    o: ["35", "40", "45", "50"],
    a: 1,
    exp: "8 multiplied by 5 equals 40.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 12 ÷ 3?",
    o: ["2", "3", "4", "5"],
    a: 2,
    exp: "12 divided by 3 equals 4.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 6²?",
    o: ["12", "30", "36", "42"],
    a: 2,
    exp: "6 squared means 6 × 6 = 36.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 14 + 6?",
    o: ["18", "20", "22", "24"],
    a: 1,
    exp: "14 plus 6 equals 20.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 50% of 100?",
    o: ["25", "50", "75", "100"],
    a: 1,
    exp: "50% represents exactly half, and half of 100 is 50.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 3/4 of 100?",
    o: ["50", "60", "70", "75"],
    a: 3,
    exp: "Three quarters of 100 is calculated as 100 × 0.75 = 75.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 11 + 9?",
    o: ["18", "19", "20", "21"],
    a: 2,
    exp: "11 plus 9 equals 20.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 30 ÷ 5?",
    o: ["4", "5", "6", "7"],
    a: 2,
    exp: "30 divided by 5 equals 6.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 2³?",
    o: ["4", "6", "8", "10"],
    a: 2,
    exp: "2 cubed means multiplying 2 three times: 2 × 2 × 2 = 8.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 9 − 4?",
    o: ["3", "4", "5", "6"],
    a: 2,
    exp: "9 minus 4 equals 5.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 7 × 7?",
    o: ["42", "45", "49", "56"],
    a: 2,
    exp: "7 times 7 equals 49.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 100 ÷ 25?",
    o: ["2", "3", "4", "5"],
    a: 2,
    exp: "100 divided by 25 equals 4.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 5 + 5 + 5?",
    o: ["10", "15", "20", "25"],
    a: 1,
    exp: "Adding 5 three times equals 15.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 16 ÷ 2?",
    o: ["6", "7", "8", "9"],
    a: 2,
    exp: "Half of 16 is 8.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 4 × 6?",
    o: ["20", "22", "24", "26"],
    a: 2,
    exp: "4 multiplied by 6 equals 24.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 3 + 9?",
    o: ["10", "11", "12", "13"],
    a: 2,
    exp: "3 plus 9 equals 12.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 20 − 5?",
    o: ["10", "12", "15", "18"],
    a: 2,
    exp: "20 minus 5 equals 15.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 6 + 6?",
    o: ["10", "11", "12", "13"],
    a: 2,
    exp: "6 plus 6 equals 12.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 18 ÷ 3?",
    o: ["5", "6", "7", "8"],
    a: 1,
    exp: "18 divided by 3 equals 6.",
    subject: "mathematics-ss1"
  },
  {
    q: "What is 10 × 10?",
    o: ["50", "80", "90", "100"],
    a: 3,
    exp: "10 times 10 equals 100.",
    subject: "mathematics-ss1"
  }
];

/* ========================================================
   MASS SEEDING ENGINE FOR INTERACTIVE FIREBASE PORTALS
   ======================================================== */
async function massUploadQuestions() {
    console.log("🚀 Starting database upload protocol...");
    let successCount = 0;
    
    for (const item of mathematicsSS1Bank) {
        try {
            // Adds records automatically as documents within the 'questions' collection
            await db.collection("questions").add(item);
            successCount++;
            console.log(`✅ Uploaded successfully: "${item.q.substring(0, 25)}..."`);
        } catch (error) {
            console.error("❌ Failed to push document context:", error);
        }
    }
    
    alert(`🎉 Success! Packed and configured ${successCount} questions into Firebase instantly.`);
}
