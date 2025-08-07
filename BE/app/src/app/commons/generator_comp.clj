(ns app.commons.generator_comp)


(defn math-decision-prompt
  [name prompt]
  [{:role    "system"
    :content "You are an AI assistant tasked with determining whether a given topic is related to mathematics. You will receive an input containing a 'name' and a 'prompt'. Your task is to analyze this information and decide if the topic is mathematical in nature.

If the topic is related to mathematics, return:
{\"math?\": true}

If the topic is not related to mathematics, return:
{\"math?\": false}

Ensure your response is a valid JSON object.
"}
   {:role    "user"
    :content (str "This is the name: '" name "' and this is the prompt: '" prompt "'")}])

(defn system-prompt-refiner
  [old-prompt]
  [{:role    "system"
    :content "Given a task description or existing prompt, produce a detailed system prompt to guide a language model in completing the task effectively.

# Guidelines

- Understand the Task: Grasp the main objective, goals, requirements, constraints, and expected output.
- Minimal Changes: If an existing prompt is provided, improve it only if it's simple. For complex prompts, enhance clarity and add missing elements without altering the original structure.
- Reasoning Before Conclusions**: Encourage reasoning steps before any conclusions are reached. ATTENTION! If the user provides examples where the reasoning happens afterward, REVERSE the order! NEVER START EXAMPLES WITH CONCLUSIONS!
    - Reasoning Order: Call out reasoning portions of the prompt and conclusion parts (specific fields by name). For each, determine the ORDER in which this is done, and whether it needs to be reversed.
    - Conclusion, classifications, or results should ALWAYS appear last.
- Examples: Include high-quality examples if helpful, using placeholders [in brackets] for complex elements.
   - What kinds of examples may need to be included, how many, and whether they are complex enough to benefit from placeholders.
- Clarity and Conciseness: Use clear, specific language. Avoid unnecessary instructions or bland statements.
- Formatting: Use markdown features for readability. DO NOT USE ``` CODE BLOCKS UNLESS SPECIFICALLY REQUESTED.
- Preserve User Content: If the input task or prompt includes extensive guidelines or examples, preserve them entirely, or as closely as possible. If they are vague, consider breaking down into sub-steps. Keep any details, guidelines, examples, variables, or placeholders provided by the user.
- Constants: DO include constants in the prompt, as they are not susceptible to prompt injection. Such as guides, rubrics, and examples.
- Output Format: Explicitly the most appropriate output format, in detail. This should include length and syntax (e.g. short sentence, paragraph, JSON, etc.)
    - For tasks outputting well-defined or structured data (classification, JSON, etc.) bias toward outputting a JSON.
    - JSON should never be wrapped in code blocks (```) unless explicitly requested.

The final prompt you output should adhere to the following structure below. Do not include any additional commentary, only output the completed system prompt. SPECIFICALLY, do not include any additional messages at the start or end of the prompt. (e.g. no '---')

[Concise instruction describing the task - this should be the first line in the prompt, no section header]

[Additional details as needed.]

[Optional sections with headings or bullet points for detailed steps.]

# Steps [optional]

[optional: a detailed breakdown of the steps necessary to accomplish the task]

# Output Format

[Specifically call out how the output should be formatted, be it response length, structure e.g. JSON, markdown, etc]

# Examples [optional]

[Optional: 1-3 well-defined examples with placeholders if necessary. Clearly mark where examples start and end, and what the input and output are. User placeholders as necessary.]
[If the examples are shorter than what a realistic example is expected to be, make a reference with () explaining how real examples should be longer / shorter / different. AND USE PLACEHOLDERS! ]

# Notes [optional]

[optional: edge cases, details, and an area to call or repeat out specific important considerations]"}
   {:role    "user"
    :content old-prompt}])



;;schema
(def options-format
  {:type        "json_schema"
   :json_schema {:name   "options_format"
                 :strict true
                 :schema {:type                 "object"
                          :properties           {:question    {:type "string"}
                                                 :options     {:type  "array"
                                                               :items {:type                 "object"
                                                                       :properties           {:option-text {:type "string"}
                                                                                              :correct     {:type "boolean"}}
                                                                       :required             ["option-text" "correct"]
                                                                       :additionalProperties false}}
                                                 ;:explanation {:type "string"}
                                                 :explanation {:type  "array"
                                                               :items {:type                 "object"
                                                                       :properties           {:option-text {:type "string"}
                                                                                              :explanation {:type "string"}}
                                                                       :required             ["option-text" "explanation"]
                                                                       :additionalProperties false}}}
                          :required             ["question" "options" "explanation"]
                          :additionalProperties false}}})

(def decomposed-format
  {:type        "json_schema"
   :json_schema {:name   "decomposed_format"
                 :strict true
                 :schema {:type                 "object"
                          :properties           {:mini-questions {:type  "array"
                                                                  :items {:type                 "object"
                                                                          :properties           {:mini-question {:type "string"}}
                                                                          :required             ["mini-question"]
                                                                          :additionalProperties false}}}
                          :required             ["mini-questions"]
                          :additionalProperties false}}})

(def explanation-format
  {:type        "json_schema"
   :json_schema {:name   "explanation_format"
                 :strict true
                 :schema {:type                 "object"
                          :properties           {:steps        {:type  "array"
                                                                :items {:type                 "object"
                                                                        :properties           {:explanation {:type "string"}
                                                                                               :output      {:type "string"}}
                                                                        :required             ["explanation" "output"]
                                                                        :additionalProperties false}}
                                                 :final-answer {:type "string"}}
                          :required             ["steps" "final-answer"]
                          :additionalProperties false}}})

(def answer-format
  {:type        "json_schema"
   :json_schema {:name   "answer_format"
                 :strict true
                 :schema {:type                 "object"
                          :properties           {:steps        {:type  "array"
                                                                :items {:type                 "object"
                                                                        :properties           {:explanation {:type "string"}
                                                                                               :output      {:type "string"}}
                                                                        :required             ["explanation" "output"]
                                                                        :additionalProperties false}}
                                                 :final-answer {:type "string"}}
                          :required             ["steps" "final-answer"]
                          :additionalProperties false}}})

(def soal-format
  {:type        "json_schema"
   :json_schema {:name   "soal_format"
                 :strict true
                 :schema {:type                 "object"
                          :properties           {:choices     {:type  "array"
                                                               :items {:type                 "object"
                                                                       :properties           {:option-text {:type "string"}
                                                                                              :correct     {:type "boolean"}}
                                                                       :required             ["option-text" "correct"]
                                                                       :additionalProperties false}}
                                                 :explanation {:type "string"}}
                          :required             ["choices" "explanation"]
                          :additionalProperties false}}})

(def soal-only-format
  {:type        "json_schema"
   :json_schema {:name   "soal_only_format"
                 :strict true
                 :schema {:type                 "object"
                          :properties           {:soals {:type  "array"
                                                         :items {:type                 "object"
                                                                 :properties           {:soal {:type "string"}}
                                                                 :required             ["soal"]
                                                                 :additionalProperties false}}}
                          :required             ["soals"]
                          :additionalProperties false}}}
  )

(def soal-template-format
  {:type        "json_schema"
   :json_schema {:name   "soal_template_format"
                 :strict true
                 :schema {:type                 "object"
                          :properties           {:templates {:type  "array"
                                                             :items {:type                 "object"
                                                                     :properties           {:template-soal {:type "string"}
                                                                                            :name          {:type "string"}}
                                                                     :required             ["template-soal" "name"]
                                                                     :additionalProperties false}}}
                          :required             ["templates"]
                          :additionalProperties false}}})

;;note schema
(def sections-schema
  {:type        "json_schema"
   :json_schema {:name   "sections_format"
                 :strict true
                 :schema {:type                 "object"
                          :properties           {:section-title   {:type "string"}
                                                 :section-content {:type "string"}}
                          :required             ["section-title" "section-content"]
                          :additionalProperties false}}})


(defn gen-options-prompt
  [question answer rules]
  [{:role    "system"
    :content (str "You are an AI tutor specialized in creating insightful multiple-choice options and explanations for math problems. Your task is to generate options that reveal common misconceptions and provide detailed explanations that follow the student's potential thought process. Adhere to these guidelines:

1. Analyze the correct answer:
   - Understand the correct solution method and any alternative valid approaches.

2. Identify common misconceptions:
   - List typical errors students might make when solving this type of problem.
   - Focus on fundamental misunderstandings of the core concept being tested.

3. Create options based on misconceptions:
   - Develop options that logically follow from these misconceptions.
   - Ensure options are plausible to someone with an incomplete understanding.
   - If no relevant misconceptions apply, consider common calculation errors.

4. Balance and format options:
   - Include options both larger and smaller than the correct answer when appropriate.
   - Maintain consistent formatting across all options.
   - Ensure incorrect options are sufficiently distinct from each other.

5. Explain each option:
   - For incorrect options:
     * Start by assuming the misconception is correct.
     * Follow the logical reasoning that stems from this misconception.
     * Explain step-by-step how a student might arrive at this answer.
     * Then, identify the critical point where this reasoning diverges from the correct approach.
     * Clarify why this divergence leads to an incorrect result.
   - For the correct option:
     * Explain the reasoning behind the correct approach.
     * Highlight key concepts used in solving the problem correctly.

6. Focus on the 'why', not just the 'what':
   - Instead of simply stating what mistake was made, explain why the misconception seemed logical initially.
   - Show how following the misconception to its conclusion reveals its flaws.

When presented with a math problem and its correct answer, generate a set of multiple-choice options and their explanations adhering to these principles.
You will return JSON object with keys: question, options, explanation. return the question on 'question' key, the options and the correct answer on the options, and the explanation on each options (both why it's correct and why it's wrong) on explanation key
Remember, the goal is to help students understand the underlying concepts by exploring why their approach might seem correct at first, but ultimately leads to an incorrect answer."
                  "Adhere to these rules (if there's any): "
                  rules)
    }
   {:role    "user"
    :content (str "Here's the problem: " question "\n Here's the correct answer: " answer)}])

(defn gen-final-explanation-prompt
  [question steps set-answers explanation rules]
  [{:role    "system"
    :content "Generate a comprehensive explanation for a math problem, addressing both incorrect and correct answers, while considering fundamental misunderstandings and clarifying key concepts with detailed reasoning.

# Steps

1. **Problem Overview:**
   - Restate the problem briefly, highlighting key information.

2. **Correct Answer Explanation:**
   - State the correct answer.
   - Provide a detailed step-by-step explanation using the provided solution, showing all calculations with LaTeX.
   - Assume the student may have basic misunderstandings, so clarify and explain each concept thoroughly, including why these concepts are necessary for solving the problem.

3. **Incorrect Answer Analysis:**
   - For each incorrect option, simulate the reasoning a student might have followed to choose it, considering potential fundamental misconceptions.
   - Explore this reasoning until it reaches a logical conclusion or contradiction.
   - Compare this to the correct method, pointing out where the reasoning diverges and addressing misconceptions, including explanations of why certain concepts are crucial.

4. Use LaTeX for all mathematical notation.

# Output Format

- **JSON Object** with:
  - `choices`: An array of objects, each containing:
    - `option-text`: Text of the option
    - `correct`: Boolean indicating correctness
    - `idx`: Index of the option (starting from 0)
  - `explanation`: Detailed explanation following specified guidelines

# Notes

- Focus strictly on the problem and its solution. Avoid unnecessary elaboration.
- Ensure all mathematical notation is formatted in LaTeX for clarity.
- Explain not just what concepts are used, but why they are important and necessary for solving the problem, addressing any misunderstandings of these concepts. "
    "Adhere to these rules (if there's any): "
    rules}
   {:role    "user"
    :content (str "Here's the problem: " question "\n Here are the steps: " steps "\n Here are the answers: " set-answers "\n Here's the 'WHY' explanation correct/not for each option: " explanation)}])

(defn gen-answer-prompt
  [question]
  [{:role    "user"
    :content "Given a list of conditions, please answer the question. Condition 1: We have the equations $3p+4q=8$ and $4p+3q=13$. Condition 2: We aim to find the value of $q$. Question: What is the value of $q$?"}
   {:role    "assistant"
    :content "Let's think step by step. To find the value of $q$, we first aim to eliminate $p$ from our equations. We do this by making the coefficient of $p$ the same in both equations. By multiplying the first equation by 4 and the second equation by 3, we get two new equations: $12p + 16q = 32$ and $12p + 9q = 39$. Now, we can subtract the second equation from the first, which leads to the cancellation of $p$ and gives us $7q = -7$. Dividing both sides by 7, we find that $q = -1$. The answer is: -1."}

   {:role    "user"
    :content "Given a list of conditions, please answer the question. Condition 1: The Smith family consists of 4 sons and 3 daughters. Condition 2: They need to be seated in a row of 7 chairs. Condition 3: The seating arrangement should ensure that at least 2 boys sit next to each other. Question: How many such seating arrangements are possible?"}
   {:role    "assistant"
    :content "Let's think step by step. First, realize that calculating directly is complex due to numerous cases. Instead, use complementary counting. There's only one arrangement avoiding two boys sitting together, which is BGBGBGB. For this arrangement, the boys can be seated in $4!$ ways, and the girls in $3!$ ways, totaling $4! \\times 3! = 144$ undesirable seatings. To find the desired seatings, subtract these from the total unrestricted seatings of $7!$. Therefore, the number of desired seatings is $7! - (4! \\times 3!) = 5040-144 = \\boxed{4896}. The answer is: 4896."}

   {:role    "user"
    :content "Given a list of conditions, please answer the question. Condition 1: The question is depicted in the diagram: [asy]\\nunitsize(1mm);\\ndefaultpen(linewidth(0.7pt));\\ndraw((0,0)--(20,0)--(20,20)--(0,20)--cycle);\\ndraw(Circle((5,5),5));\\ndraw(Circle((15,5),5));\\ndraw(Circle((5,15),5));\\ndraw(Circle((15,15),5));\\n[/asy]. Condition 2: As shown in the diagram, a square is arranged with four circles each of radius 5 inches. Condition 3: Each circle is positioned at each corner inside the square. Question: What is the area of the square, in square inches?"}
   {:role    "assistant"
    :content "Let's think step by step. To determine the area of the square, we need to know its side length. The diagram shows one circle in each corner of the square, with each circle touching the square's sides and adjacent circles. The diameter of one circle is twice its radius, so the diameter is $2 \\times 5$ inches = $10$ inches. Since the square can accommodate two diameters along its length and width (because there are two circles along each dimension), the side length of the square is $10$ inches + $10$ inches = $20$ inches. Therefore, the area of the square is calculated by squaring its side length, which gives us $20$ inches \\times $20$ inches = $400$ square inches. The answer is: 400."}

   {:role    "user"
    :content "Given a list of conditions, please answer the question. Condition 1: Let $a$ be a multiple of 1428. Condition 2: We are to find the greatest common divisor of the polynomial $a^2+9a+24$ and the expression $a+4$. Question: What is the greatest common divisor?"}
   {:role    "assistant"
    :content "Let's think step by step. To find the greatest common divisor of $a^2+9a+24$ and $a+4$, we apply the Euclidean Algorithm. We observe that $a^2+9a+24$ can be related to $a+4$ by subtracting $(a+5)(a+4)$ from $a^2+9a+24$, simplifying to $a^2+9a+24-(a^2+9a+20)$. This subtraction leaves us with $4$, leading to \\text{gcd}(4, a+4). Since $4$ is a divisor of every multiple of 1428, including $a$ and thus $a+4$, the greatest common divisor is $4$. The answer is: 4."}
   {:role    "user"
    :content (str "Given a list of conditions, please answer the question. " question)}])

(defn gen-steps-prompt
  [question]
  [{:role    "system"
    :content "You are an AI assistant to help me rephrase questions by splitting the question context into conditions. In your rephrased question, remember to fully express the information in the original question"}
   {:role    "user"
    :content "Original Question: The perimeter of a rectangle is 24 inches. What is the number of square inches in the maximum possible area for this rectangle?"}
   {:role    "assistant"
    :content "Rephrased Question: Given a list of conditions, please answer the question. Condition 1: A rectangle's perimeter is 24 inches. Question: What is the largest possible area, in square inches, that this rectangle can have?"}
   {:role    "user"
    :content "Original Question: A 2 by 2003 rectangle consists of unit squares as shown below.  The middle unit square of each row is shaded.  If a rectangle from the figure is chosen at random, what is the probability that the rectangle does not include a shaded square?  Express your answer as a common fraction. [asy]\nsize(7cm);\ndefaultpen(linewidth(0.7));\ndotfactor=4;\nint i,j;\n\nfill((6,0)--(7,0)--(7,2)--(6,2)--cycle,gray);\n\nfor(i=0;i<=3;++i)\n\n{\n\ndraw((i,0)--(i,2));\n\ndraw((i+5,0)--(i+5,2));\n\ndraw((i+10,0)--(i+10,2));\n\n}\nfor(j=0;j<=2;++j)\n\n{\n\ndraw((0,j)--(3.3,j));\n\ndraw((0,j)--(3.3,j));\n\ndraw((4.7,j)--(8.3,j));\n\ndraw((4.7,j)--(8.3,j));\n\ndraw((9.7,j)--(13,j));\n\ndraw((9.7,j)--(13,j));\n\n}\n\nreal x;\n\nfor(x=3.7;x<=4.3;x=x+0.3)\n\n{\n\ndot((x,0));\n\ndot((x,2));\n\ndot((x+5,0));\n\ndot((x+5,2));\n\n}[/asy]"}
   {:role    "assistant"
    :content "Rephrased Question: Given a list of conditions, please answer the question. Condition 1: The question is depicted in the diagram: [asy]\nsize(7cm);\ndefaultpen(linewidth(0.7));\ndotfactor=4;\nint i,j;\n\nfill((6,0)--(7,0)--(7,2)--(6,2)--cycle,gray);\n\nfor(i=0;i<=3;++i)\n\n{\n\ndraw((i,0)--(i,2));\n\ndraw((i+5,0)--(i+5,2));\n\ndraw((i+10,0)--(i+10,2));\n\n}\nfor(j=0;j<=2;++j)\n\n{\n\ndraw((0,j)--(3.3,j));\n\ndraw((0,j)--(3.3,j));\n\ndraw((4.7,j)--(8.3,j));\n\ndraw((4.7,j)--(8.3,j));\n\ndraw((9.7,j)--(13,j));\n\ndraw((9.7,j)--(13,j));\n\n}\n\nreal x;\n\nfor(x=3.7;x<=4.3;x=x+0.3)\n\n{\n\ndot((x,0));\n\ndot((x,2));\n\ndot((x+5,0));\n\ndot((x+5,2));\n\n}[/asy]. Condition 2: As shown in the diagram, a 2 by 2003 rectangle consists of unit squares, with the middle unit square of each row shaded. Condition 3: A rectangle from the diagram is chosen at random. Question: What is the probability, expressed as a common fraction, that the chosen rectangle does not include any shaded squares?"}
   {:role    "user"
    :content "Original Question: Points $A$, $B$, $C$, and $D$ are located on $\\overline{AB}$ such that $AB = 3AD = 6BC$. If a point is selected at random on $\\overline{AB}$, what is the probability that it is between $C$ and $D$? Express your answer as a common fraction.\n\n[asy]\n\ndraw((0,0)--(12,.0000000001));\ndot((0,0)); dot((4,0)); dot((10,0)); dot((12,0));\nlabel(\"$A$\", (0,0), S);\nlabel(\"$D$\", (4,0), S);\nlabel(\"$C$\", (10,0), S);\nlabel(\"$B$\", (12,0), S);\n\n[/asy]"}
   {:role    "assistant"
    :content "Rephrased Question: Given a list of conditions, please answer the question. Condition 1: The question is depicted in the diagram: [asy]\n\ndraw((0,0)--(12,.0000000001));\ndot((0,0)); dot((4,0)); dot((10,0)); dot((12,0));\nlabel(\"$A$\", (0,0), S);\nlabel(\"$D$\", (4,0), S);\nlabel(\"$C$\", (10,0), S);\nlabel(\"$B$\", (12,0), S);\n\n[/asy]. Condition 2: As shown in the diagram, points A, B, C, and D are positioned on line segment AB in such a way that the length of AB is three times that of AD and six times that of BC. Condition 3: A point is selected at random on the line segment AB. Question: What is the probability, expressed as a common fraction, that the selected point will be located between points C and D?"}
   {:role    "user"
    :content "Original Question: In the diagram, $\\triangle XYZ$ is right-angled at $X,$ with $YX=60$ and $XZ=80.$ The point $W$ is on $YZ$ so that $WX$ is perpendicular to $YZ.$ Determine the length of $WZ.$ [asy]\npair X, Y, Z, W;\nY=(0,0);\nX=(36,48);\nZ=(100,0);\nW=(36,0);\ndraw(X--Y--Z--X--W);\nlabel(\"Y\", Y, SW);\nlabel(\"X\", X, N);\nlabel(\"W\", W, S);\nlabel(\"Z\", Z, SE);\nlabel(\"60\", (X+Y)/2, NW);\nlabel(\"80\", (X+Z)/2, NE);\n[/asy]"}
   {:role    "assistant"
    :content "Rephrased Question: Given a list of conditions, please answer the question. Condition 1: The question is depicted in the diagram: [asy]\npair X, Y, Z, W;\nY=(0,0);\nX=(36,48);\nZ=(100,0);\nW=(36,0);\ndraw(X--Y--Z--X--W);\nlabel(\"Y\", Y, SW);\nlabel(\"X\", X, N);\nlabel(\"W\", W, S);\nlabel(\"Z\", Z, SE);\nlabel(\"60\", (X+Y)/2, NW);\nlabel(\"80\", (X+Z)/2, NE);\n[/asy]. Condition 2: As shown in the diagram, triangle XYZ is right-angled at point X, with YX equal to 60 and XZ equal to 80. Condition 3: The point W lies on line segment YZ such that line WX is perpendicular to YZ. Question: What is the length of segment WZ?"}
   {:role    "user"
    :content "Original Question: The polynomial $x^3 - 2004 x^2 + mx + n$ has integer coefficients and three distinct positive zeros.  Exactly one of these is an integer, and it is the sum of the other two.  How many values of $n$ are possible?"}
   {:role    "assistant"
    :content "Rephrased Question: Given a list of conditions, please answer the question. Condition 1: The polynomial in question is $x^3 - 2004 x^2 + mx + n$, with integer coefficients. Condition 2: This polynomial has three distinct positive zeros. Condition 3: Exactly one of the zeros is an integer, and this integer zero is equal to the sum of the other two zeros. Question: How many different values of $n$ are possible?"}
   {:role    "user"
    :content (str "Original Question: " question)}])



;INFO : ===== proset-list =====
;[{:template-soal
;  "Sebuah toko memberikan diskon 25% untuk semua barang. Jika harga asli sebuah barang adalah Rp200.000, berapa harga setelah diskon? \nA. Rp150.000 \nB. Rp175.000 \nC. Rp200.000 \nD. Rp50.000 \nE. Rp100.000 \nJawaban yang benar: A"}
; {:template-soal
;  "Dalam sebuah kelas, 60% siswa lulus ujian. Jika ada 30 siswa di kelas tersebut, berapa banyak siswa yang lulus? \nA. 18 siswa \nB. 20 siswa \nC. 24 siswa \nD. 30 siswa \nE. 12 siswa \nJawaban yang benar: B"}
; {:template-soal
;  "Seorang penjual mobil menjual 40% dari total mobil yang dimilikinya. Jika ia memiliki 50 mobil, berapa banyak mobil yang belum terjual? \nA. 20 mobil \nB. 30 mobil \nC. 25 mobil \nD. 10 mobil \nE. 15 mobil \nJawaban yang benar: B"}]
;INFO : ===== raw-soals =====
;[{:soals
;  [{:soal
;    "Sebuah toko memberikan diskon 30% untuk semua barang. Jika harga asli sebuah barang adalah Rp300.000, berapa harga setelah diskon?"}
;   {:soal
;    "Sebuah toko memberikan diskon 15% untuk semua barang. Jika harga asli sebuah barang adalah Rp250.000, berapa harga setelah diskon?"}
;   {:soal
;    "Sebuah toko memberikan diskon 20% untuk semua barang. Jika harga asli sebuah barang adalah Rp400.000, berapa harga setelah diskon?"}
;   {:soal
;    "Sebuah toko memberikan diskon 10% untuk semua barang. Jika harga asli sebuah barang adalah Rp150.000, berapa harga setelah diskon?"}
;   {:soal
;    "Sebuah toko memberikan diskon 40% untuk semua barang. Jika harga asli sebuah barang adalah Rp500.000, berapa harga setelah diskon?"}]}
; {:soals
;  [{:soal
;    "Dalam sebuah kelas, 75% siswa lulus ujian. Jika ada 40 siswa di kelas tersebut, berapa banyak siswa yang lulus?"}
;   {:soal
;    "Di sebuah sekolah, 80% siswa berhasil menyelesaikan program belajar. Jika ada 50 siswa yang terdaftar, berapa banyak siswa yang berhasil?"}
;   {:soal
;    "Dalam sebuah tim, 70% anggota tim mencapai target. Jika ada 20 anggota dalam tim tersebut, berapa banyak anggota yang mencapai target?"}
;   {:soal
;    "Di sebuah universitas, 65% mahasiswa lulus ujian akhir. Jika ada 80 mahasiswa yang mengikuti ujian, berapa banyak mahasiswa yang lulus?"}
;   {:soal
;    "Dalam sebuah kompetisi, 90% peserta mendapatkan medali. Jika ada 100 peserta dalam kompetisi tersebut, berapa banyak peserta yang mendapatkan medali?"}]}
; {:soals
;  [{:soal
;    "Seorang penjual sepeda menjual 25% dari total sepeda yang dimilikinya. Jika ia memiliki 80 sepeda, berapa banyak sepeda yang belum terjual?"}
;   {:soal
;    "Seorang penjual buku menjual 60% dari total buku yang dimilikinya. Jika ia memiliki 120 buku, berapa banyak buku yang belum terjual?"}
;   {:soal
;    "Seorang penjual pakaian menjual 50% dari total pakaian yang dimilikinya. Jika ia memiliki 200 pakaian, berapa banyak pakaian yang belum terjual?"}
;   {:soal
;    "Seorang penjual mainan menjual 30% dari total mainan yang dimilikinya. Jika ia memiliki 70 mainan, berapa banyak mainan yang belum terjual?"}
;   {:soal
;    "Seorang penjual elektronik menjual 45% dari total barang elektronik yang dimilikinya. Jika ia memiliki 90 barang elektronik, berapa banyak barang yang belum terjual?"}]}]



;;skill update shit
(def improved-course-format
  {:type        "json_schema"
   :json_schema {:name   "improved_skill_prompt_format"
                 :strict true
                 :schema {:type                 "object"
                          :properties           {:name   {:type "string"}
                                                 :prompt {:type "string"}}
                          :required             ["name" "prompt"]
                          :additionalProperties false}}})