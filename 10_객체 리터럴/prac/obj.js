const student = {
    name: "안예인",
    score: 60,
    study: function () {
        this.score++;
    }
};

student.study();
console.log(student.score); // 61
