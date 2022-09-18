package com.example.api.error.exception;

public class ExceptionMessage {
    public static final String EMAIL_TAKEN = "Podany adres email jest zajęty";
    public static final String INDEX_TAKEN = "Podany numer indeksu jest zajęty";
    public static final String GROUP_CODE_NOT_EXIST = "Podany kod grupy nie istnieje";
    public static final String GROUP_NAME_TAKEN = "Podana nazwa grupy jest zajęta";
    public static final String GROUP_CODE_TAKEN = "Podany kod grupy jest zajęty";
    public static final String FORM_FIELDS_NOT_NULL = "Wszystkie pola w tym pliku json muszą mieć wartość";
    public static final String GRAPH_TASK_FORM_FIELDS_NOT_NULL = "Wszystkie pola w tym pliku json w głównym obiekcie muszą mieć wartość";
    public static final String GRAPH_TASK_QUESTIONS_SIZE = "Lista z pytaniami musi posiadać conajmniej 2 elementy";
    public static final String GRAPH_TASK_QUESTIONS_FIRST_INDEX = "Pierwsze pytanie musi posiadać pole questionNum równe 0";
    public static final String GRAPH_TASK_QUESTIONS_NUM = "Wszystkie pytania musią posiadać pole questionNum";
    public static final String GRAPH_TASK_FIELDS_REQ = "Pola questionType, content, hint, difficulty, points, nextQuestions muszą mieć wartość";
    public static final String GRAPH_TASK_FIELDS_ANSWERS_OPENED = "Pole answers dla pytania typu OPENED musi posiadać wartośc null lub pustą tablicę";
    public static final String GRAPH_TASK_FIELDS_ANSWER_OPENED = "Pole answerForOpenedQuestion dla pytania typu OPENED nie może być nullem lub pustym stringiem";
    public static final String GRAPH_TASK_FIELDS_ANSWER_SINGLE = "Odpowiedzi dla pytania typu SINGLE_CHOICE muszą posiadać JEDNĄ prawidłową odpowiedź";
    public static final String GRAPH_TASK_FIELDS_QUESTIONS_FIRST = "Dla pierwszego pytania pole nextQuestions nie może być nullem";
    public static final String GRAPH_TASK_FIELDS_ANSWERS_SINGLE_MULTIPLE ="Pole answers dla pytania typu SINGLE_CHOICE i MULTIPLE_CHOICE nie może być nullem i musi posiadać conajmniej 2 elementy";
    public static final String GRAPH_TASK_FIELDS_ANSWER_SINGLE_MULTIPLE ="Pole answerForOpenedQuestion dla pytania typu SINGLE_CHOICE i MULTIPLE_CHOICE powinno być nullem lub pustym stringiem";
    public static final String OPTION_FORM_FIELDS ="Każde pole w odpowiedzi do pytania powinno miec wartość";
    public static final String INVALID_QUESTION_TYPE ="Pole questionType powinno mieć wartość OPENED / SINGLE_CHOICE / MULTIPLE_CHOICE";
    public static final String INVALID_DIFFICULTY ="Pole difficulty powinno mieć wartość EASY / MEDIUM / HARD";
    public static final String CONTENT_LEN_TOO_BIG ="Liczba znaków w polu content nie może przekraczać 1000";
    public static final String GRAPH_TASK_TITLE_NOT_UNIQUE ="Tytuł ekspedycji musi byc unikalny";
    public static final String FILE_TASK_TITLE_NOT_UNIQUE ="Tytuł zadania bojowego musi byc unikalny";
    public static final String TWO_ACTIVITIES_ON_THE_SAME_POSITION ="Dwie aktywności nie mogą być na takiej samej pozycji!";
    public static final String ACTIVITY_OUTSIDE_BOUNDARIES ="Pozycja aktywności musi mieścić się w obszarze mapy!";
    public static final String TWO_CHAPTERS_ON_THE_SAME_POSITION ="Dwa rozdziały nie mogą być na takiej samej pozycji!";
    public static final String GROUP_NOT_FOUND ="Grupa o podanej nazwie nie istnieje: ";
    public static final String STUDENT_NOT_FOUND ="Student o podanym emailu nie istnieje: ";
    public static final String GRAPH_TASK_NOT_FOUND ="Ekspedycja o podanej nazwie nie istnieje: ";
    public static final String FILE_TASK_NOT_FOUND ="Zadanie bojowe o podanej nazwie nie istnieje: ";
    public static final String GROUP_NAME_CONTAINS_SEMICOLON ="Nazwa grupy nie może posiadać średnika";
    public static final String EMAIL_CONTAINS_SEMICOLON ="Email nie może posiadać średnika";
    public static final String FILE_TASK_TITLE_CONTAINS_SEMICOLON ="Nazwa zadania bojowego nie może posiadać średnika";
    public static final String GRAPH_TASK_TITLE_CONTAINS_SEMICOLON ="Nazwa ekspedycji nie może posiadać średnika";
}
