/**
 * Axios 확장
 * interceptor를 통한 request, response 제어부
 */
import axios from 'axios'
import * as Sentry from "@sentry/vue"

// Sentry 초기화
Sentry.init({
    dsn: 'https://897569faa08a284adcfc71b0c7347c0e@o4506936174379008.ingest.us.sentry.io/4506936174510080', // 여기에 Sentry 프로젝트의 DSN을 입력하세요
});

// Axios의 request 인터셉터 설정
axios.interceptors.request.use(function (config) {
    // 요청을 보내기 전에 수행할 로직을 작성합니다.
    console.log('요청 보내기 전:', config);

    // ################### TO-DO ################### //

    // 1. 요청 헤더 설정: 인증 토큰이나 사용자 정보를 포함하는 요청 헤더를 설정합니다.
    // 2. 요청 데이터 변경: 요청의 데이터를 변경하거나 가공합니다.
    // 3. 요청 로깅: 요청을 로깅하여 디버깅 및 추적에 도움이 되도록 합니다.

    // config.headers.Authorization = `Bearer ${token}`;

    // ################### TO-DO ################### //


    // 설정을 변경한 후에는 반드시 설정(config)을 반환해야 합니다.
    return config;
}, function (error) {
    // 요청 오류 시 수행할 로직을 작성합니다.
    console.error('요청 오류:', error);

    // 오류가 났을때 요청 데이터를 Sentry에 전달합니다.
    Sentry.addBreadcrumb({
        category: 'axios-request',
        message: 'Sending request',
        data: {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data
        }
    });
    // 에러 내용 수집
    Sentry.captureException(error);

    // Promise 오류를 반환합니다.
    return Promise.reject(error);
});

// Axios의 response 인터셉터 설정
axios.interceptors.response.use(function (response) {
    // 응답을 받은 후에 수행할 로직을 작성합니다.
    console.log('응답을 받은 후:', response);

    // ################### TO-DO ################### //

    // 1. 응답 데이터 가공: 받은 응답 데이터를 필요에 따라 가공하여 사용합니다.
    // 2. 응답 로깅: 받은 응답을 로깅하여 디버깅 및 추적에 도움이 되도록 합니다.
    // 3. 에러 처리: 서버에서 받은 에러 응답을 처리하거나 클라이언트 측에서의 오류를 처리합니다.
    // 4. 오류 코드값에 따라 공통 Alert 처리(404, 500 코드에 따라 문구처리)

    // if (response.data) {
    //     response.data.modified = true;
    // }

    // ################### TO-DO ################### //


    // 응답을 변경한 후에는 반드시 응답(response)을 반환해야 합니다.
    return response;
}, function (error) {
    // 응답 오류 시 수행할 로직을 작성합니다.
    console.error('응답 오류:', error);

     // 오류가 났을때 응답 데이터를 Sentry에 전달합니다.
     Sentry.addBreadcrumb({
        category: 'axios-response',
        message: 'Received response',
        data: {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data
        }
    });
    
    Sentry.captureException(error);
    
    // Promise 오류를 반환합니다.
    return Promise.reject(error);
});

export default axios;