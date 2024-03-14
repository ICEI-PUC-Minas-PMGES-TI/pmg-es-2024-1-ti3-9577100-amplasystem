package amplasystem.api.utils;

public class Regex {
    private static String REGEX_EMAIL = "^[A-Za-z0-9_%+-]+([A-Za-z0-9.-]?[A-Za-z0-9-]+)*@[A-Za-z0-9-]+([A-Za-z0-9.-]?)+\\.[a-zA-Z]{2,3}+(\\.[a-zA-Z]{2,3}+)?$";
     
    public static boolean isValidEmail(String email) {
        return email.matches(REGEX_EMAIL);
     }
}
