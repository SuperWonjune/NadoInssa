package com.wonjun;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import com.google.gson.Gson;

public class NaverSearchAPI {
    private static final String CLIENT_ID = "s0yv36TdmdSfuLfd1ZpM";
    private static final String CLIENT_SECRET = "_ONaK5Htw8";
    private static final String URL = "https://openapi.naver.com/v1/datalab/search";

    private HttpEntity<?> headers;
    private RestTemplate template = new RestTemplate();

    private Gson gson = new Gson();

    private SearchResult resultJsonObject;

    public void request(String requestWord) {
        String clientId = "s0yv36TdmdSfuLfd1ZpM";//애플리케이션 클라이언트 아이디값";
        String clientSecret = "_ONaK5Htw8";//애플리케이션 클라이언트 시크릿값";
        try {
            String apiURL = "https://openapi.naver.com/v1/datalab/search";
            String body = "{\"startDate\":\"2017-12-01\",\"endDate\":\"2018-12-01\",\"timeUnit\":\"month\",\"keywordGroups\":[{\"groupName\":\"" + requestWord + "\",\"keywords\":[\"" + requestWord + "\"]}]}";
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("X-Naver-Client-Id", clientId);
            con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
            con.setRequestProperty("Content-Type", "application/json");

            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(body.getBytes());
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode==200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            String jsonResult = response.toString();
            System.out.println(jsonResult);

            SearchResult searchResult = gson.fromJson(jsonResult, SearchResult.class);
            resultJsonObject = searchResult;

        } catch (Exception e) {
            System.out.println(e);
        }


    }

    public SearchResult getResultJsonObject() {
        return resultJsonObject;
    }
}
