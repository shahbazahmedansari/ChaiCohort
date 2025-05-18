const fs = require('fs');

function addTwoNumber(a, b) {
  // write your code
}

// Reading input from stdin (using fs to read all input)
const input = fs.readFileSync(0, "utf-8").trim();

const [a, b] = input.split(" ").map(Number);

console.log(addTwoNumber(a, b));

`const fs = require('fs');\n\nfunction addTwoNumber(a, b) {\n  // write your code\n}\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, \"utf-8\").trim();\n\nconst [a, b] = input.split(\" \").map(Number);\n\nconsole.log(addTwoNumber(a, b));`;

`def add_two_number(a, b):\n    # write your code\n    pass\n\n# Reading input from stdin\na, b = map(int, input().strip().split())\n\nprint(add_two_number(a, b))`;

`import java.util.Scanner;\n\npublic class Main {\n    public static int addTwoNumber(int a, int b) {\n        // write your code\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int a = scanner.nextInt();\n        int b = scanner.nextInt();\n        System.out.println(addTwoNumber(a, b));\n    }\n}`;
