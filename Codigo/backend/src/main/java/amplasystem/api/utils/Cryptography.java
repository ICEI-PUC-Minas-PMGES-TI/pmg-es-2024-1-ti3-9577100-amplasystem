package amplasystem.api.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Cryptography {

    public static String tokenGenerate(String value) {

        MessageDigest md;
        try {
            md = MessageDigest.getInstance("SHA-256");
            md.update(value.getBytes());

            byte[] digest = md.digest();
            
    
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < 3; i++) {
                hexString.append(Integer.toHexString(0xFF & digest[i]));
            }
    
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
           
            e.printStackTrace();
        }
        return "";
    }
}