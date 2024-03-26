import _ from 'lodash';
import moment from 'moment';
import isEmpty from 'is-empty';
import CryptoJS from 'crypto-js';
import constant from './define';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const commonUtil = {
  dateUtil: {
    // 년월일(YYYYMMDD) 구하기
    getYMD: function (format = "YYYYMMDD") {
      return moment(new Date()).format(format);
    },

    /**
    * 24시간 형식의 시간을 12시간 형식으로 변환합니다.
    * @param {string} getTime - 24시간 형식의 시간 문자열
    * @returns {string} 변환된 12시간 형식의 시간 문자열
    */
    convert12H: function (getTime) {
      // 문자열을 정수로 변환합니다.
      var intTime = parseInt(getTime);

      // 시간에 따라 "오전" 또는 "오후"를 결정합니다.
      var str = intTime < 12 ? "오전" : "오후";

      // 변환 후 시간을 계산합니다.
      var cvHour = (intTime === 12) ? 12 : intTime % 12;

      // 변환된 문자열을 생성합니다.
      var res = str + " " + cvHour;

      // 결과를 반환합니다.
      return res;
    },

    /**
    * 주어진 날짜 문자열에 대한 요일을 가져옵니다.
    * @param {string} str - 날짜 문자열
    * @returns {string} 요일 또는 "오늘"
    */
    getDayFormat: function (str) {
      // 현재 날짜와 시간을 가져옵니다.
      let today = moment();
      // 입력된 날짜 문자열을 파싱합니다.
      let getDate = moment(str, "YYYYMMDD");

      // 입력된 문자열의 길이에 따라 날짜 형식을 지정합니다.
      if (str.length === 14) {
        getDate = moment(str, "YYYYMMDDHHmmss");
      }

      // 오늘 날짜와 입력된 날짜가 같은 경우 "오늘"을 반환합니다.
      if (today.format("YYYYMMDD") === getDate.format("YYYYMMDD")) {
        return "Today";
      } else {
        // 다른 경우 입력된 날짜의 요일을 반환합니다.
        return getDate.format("ddd") + "요일";
      }
    },

    /**
    * 주어진 시간 문자열을 지정된 형식으로 포맷팅합니다.
    * @param {string} str - 포맷팅할 시간 문자열
    * @returns {string} 포맷팅된 시간 문자열
    */
    timeFormat: function (str) {
      // 시간 문자열이 비어있지 않은 경우에만 포맷팅을 수행합니다.
      if (str) {
        // 시간 문자열의 길이에 따라 다른 포맷팅을 적용합니다.
        if (str.length === 6) {
          // "HHmmss" 형식의 시간 문자열 포맷팅
          return moment(str, "HHmmss").format("HH:mm:ss");
        } else if (str.length === 4) {
          // "HHmm" 형식의 시간 문자열 포맷팅
          return moment(str, "HHmm").format("HH:mm");
        } else {
          // 지정된 형식에 맞지 않는 경우 원본 문자열을 반환합니다.
          return str;
        }
      } else {
        // 시간 문자열이 비어있는 경우 현재 시간을 기본 포맷으로 반환합니다.
        return moment().format("HH:mm:ss");
      }
    },

    /**
    * 주어진 날짜 문자열을 지정된 형식으로 포맷팅합니다.
    * @param {string} str - 포맷팅할 날짜 문자열
    * @param {string} type - 포맷팅 유형, 기본값은 "."입니다.
    * @returns {string} 포맷팅된 날짜 문자열
    */
    dateFormat: function (str, type) {
      // 포맷팅 유형이 지정되지 않았을 경우 "."으로 설정합니다.
      let formatType = type || ".";
      // 날짜 문자열이 비어있지 않은 경우에만 포맷팅을 수행합니다.
      if (str) {
        // 날짜 문자열의 길이에 따라 다른 포맷팅을 적용합니다.
        if (str.length === 8) {
          // "YYYYMMDD" 형식의 날짜 문자열 포맷팅
          return moment(str, "YYYYMMDD").format(formatType === "-" ? "YYYY-MM-DD" : "YYYY.MM.DD");
        } else if (str.length === 6) {
          // "YYYYMM" 형식의 날짜 문자열 포맷팅
          return moment(str, "YYYYMM").format(formatType === "-" ? "YYYY-MM" : "YYYY.MM");
        } else if (str.length === 4) {
          // "MMDD" 형식의 날짜 문자열 포맷팅
          return moment(str, "MMDD").format(formatType === "-" ? "MM-DD" : "MM.DD");
        } else {
          // 지정된 형식에 맞지 않는 경우 원본 문자열을 반환합니다.
          return str;
        }
      } else {
        // 날짜 문자열이 비어있는 경우 빈 문자열을 반환합니다.
        return "";
      }
    },

    /**
    * 주어진 날짜 문자열을 지정된 형식으로 포맷팅합니다.
    * @param {string} str - 포맷팅할 날짜 문자열
    * @param {string} type - 포맷팅 유형, 기본값은 "."입니다.
    * @returns {string} 포맷팅된 날짜 문자열
    */
    dateTimeFormat: function (str, type) {
      // 포맷팅 유형이 지정되지 않았을 경우 "."으로 설정합니다.
      let formatType = type || ".";
      // 날짜 문자열이 비어있지 않은 경우에만 포맷팅을 수행합니다.
      if (!isEmpty(str)) {
        // 날짜 문자열의 길이에 따라 다른 포맷팅을 적용합니다.
        if (str.length === 14) {
          // "YYYYMMDDHHmmss" 형식의 날짜 문자열 포맷팅
          if (formatType === "-") {
            return moment(str, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss");
          } else {
            return moment(str, "YYYYMMDDHHmmss").format("YYYY.MM.DD HH:mm:ss");
          }
        } else if (str.length === 12) {
          // "YYYYMMDDHHmm" 형식의 날짜 문자열 포맷팅
          if (formatType === "-") {
            return moment(str, "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm");
          } else {
            return moment(str, "YYYYMMDDHHmm").format("YYYY.MM.DD HH:mm");
          }
        }
      }
      // 날짜 문자열이 비어있는 경우 현재 날짜와 시간을 기본 포맷으로 반환합니다.
      return moment().format("YYYY-MM-DD HH:mm");
    },
    /**
    * 날짜를 추가하거나 빼는 함수입니다.
    * @param {string} _nowDate - 현재 날짜를 나타내는 문자열 또는 'today'로 지정할 수 있습니다.
    * @param {number} _addOrSubDay - 더하거나 뺄 날짜 수입니다. 양수는 더하고, 음수는 뺍니다.
    * @returns {string} 날짜가 추가 또는 빠진 후의 결과를 YYYY-MM-DD 형식의 문자열로 반환합니다.
    * 예시 : setDateAddOrSub('today', -3), setDateAddOrSub('20240320', 3);
    */
    setDateAddOrSub: function (_nowDate, _addOrSubDay) {
      if (_nowDate === 'today') {
        if (_addOrSubDay >= 0) {
          return moment().add(_addOrSubDay, 'day').format('YYYY-MM-DD');
        } else {
          return moment().subtract(Math.abs(_addOrSubDay), 'day').format('YYYY-MM-DD');
        }
      } else {
        const parsedDate = moment(StringUtil.extractNumber(_nowDate), 'YYYYMMDD');
        if (_addOrSubDay >= 0) {
          return parsedDate.add(_addOrSubDay, 'day').format('YYYY-MM-DD');
        } else {
          return parsedDate.subtract(Math.abs(_addOrSubDay), 'day').format('YYYY-MM-DD');
        }
      }
    },
    /**
    * 두 날짜 간의 차이를 계산하는 함수입니다.
    * @param {string} _fromDt - 시작 날짜를 나타내는 문자열입니다.
    * @param {string} _toDt - 종료 날짜를 나타내는 문자열입니다.
    * @param {string} flag - 반환되는 차이의 단위입니다. 'days', 'hours', 'minutes', 'seconds' 중 하나를 지정할 수 있습니다.
    * @returns {number} 두 날짜 간의 차이를 지정된 단위로 반환합니다.
    * 예시 : dateDiff('2024-03-20', '2024-03-25', 'days');
    */
    dateDiff: function (_fromDt, _toDt, flag) {
      return moment(_fromDt).diff(moment(_toDt), flag);
    }

  },
  stringUtil: {
    /**
    * 숫자를 세 자리 단위로 콤마로 구분하여 반환합니다.
    * @param {string} str - 콤마를 추가할 숫자 문자열
    * @returns {string} 콤마가 추가된 숫자 문자열
    */
    addComma: function (str) {
      // 숫자가 아닌 경우에만 숫자로 변환합니다.
      if (!Number(str)) {
        str = extractNumber(String(str));
      } else {
        str = String(str);
      }

      try {
        // 숫자 문자열에 콤마를 추가하여 반환합니다.
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
      } catch (e) {
        // 오류가 발생한 경우 원본 문자열을 반환합니다.
        return str;
      }
    },

    /**
    * 주어진 문자열에서 쉼표를 제거합니다.
    * @param {string} str - 쉼표를 제거할 문자열입니다.
    * @returns {string} 쉼표가 제거된 문자열입니다.
    */
    removeComma: function (str) {
      str = String(str);
      try {
        return str.replace(/[^\d]+/g, '');
      } catch (e) {
        return str;
      }
    },

    /** 
    * 입력값에서 특수문자를 제외한 문자열을 반환합니다.
    * @param {string} input - 입력값 문자열
    * @returns {string} 특수문자가 제외된 문자열
    */
    removeSpecialChars: function (input) {
      const expText = /[?#$&\\+"]/gi;
      if (expText.test(input)) {
        alert("특수문자를 입력할 수 없습니다");
        return input.replace(expText, "");
      }
    },

    /**
    * 주어진 문자열을 지정된 길이로 패딩하여 반환합니다.
    * @param {string} str - 패딩할 문자열입니다.
    * @param {number} length - 지정된 길이입니다.
    * @returns {string} 패딩된 문자열입니다.
    */
    zeroPad: function (str, length) {
      str = String(str);
      return str.length < length ? zeroPad("0" + str, length) : str;
    },

    /**
    * 지정된 길이만큼 문자열을 왼쪽으로 패딩하여 반환합니다.
    * @param {string|number} s - 패딩할 문자열 또는 숫자입니다.
    * @param {string} c - 패딩에 사용할 문자입니다.
    * @param {number} n - 지정된 길이입니다.
    * @returns {string} 패딩된 문자열입니다.
    * 예제 : lpad("123", "0", 5) // 출력: "00123" , lpad("abc", "*", 8) // 출력: "*****abc"
    */
    lpad: function (s, c, n) {
      var _s = typeof s === "number" ? s.toString() : s;
      if (!_s || !c || _s.length >= n) {
        return _s;
      }

      var max = (n - _s.length) / c.length;
      for (var i = 0; i < max; i++) {
        _s = c + _s;
      }

      return _s;
    },

    /**
    * 주어진 문자열에서 주어진 시작 위치부터 끝 위치까지의 문자를 마스킹 처리하는 함수.
    * @param {string} str - 대상 문자열
    * @param {string} chr - 마스킹에 사용할 문자
    * @param {number} startPosition - 시작 위치 (0부터 시작)
    * @param {number} endPosition - 끝 위치 (전체 길이보다 작아야 함)
    * @returns {string} 마스킹 처리된 문자열
    */
    formatMaskByPosition: function (str, chr, startPosition, endPosition) {
      // 문자열 좌우 공백 제거
      str = str.trim();
      var temp = str;

      // 끝 위치가 문자열 길이보다 크면 끝 위치를 문자열 길이로 설정
      if (endPosition > str.length) {
        endPosition = str.length;
      }

      // 시작 위치부터 끝 위치까지 문자를 chr로 대체하여 새로운 문자열 생성
      for (var i = startPosition; i < endPosition; i++) {
        temp = replaceAt(temp, i, chr);
      }
      return temp;
    },

    /**
    * 문자열의 특정 위치에 새로운 문자를 대체하여 반환하는 함수.
    * @param {string} str - 대상 문자열
    * @param {number} index - 대체할 위치 인덱스
    * @param {string} chr - 대체할 문자
    * @returns {string} 대체된 문자열
    */
    replaceAt: function (str, index, chr) {
      // 인덱스가 문자열 범위를 벗어나면 원본 문자열 반환
      if (index < 0 || index >= str.length) {
        return str;
      }
      // 문자열의 인덱스 위치에 새로운 문자를 대체하여 반환
      return str.substring(0, index) + chr + str.substring(index + 1);
    },

    /**
    * 주어진 문자열의 바이트 수를 계산합니다.
    * @param {string} src - 바이트 수를 계산할 문자열
    * @returns {number} - 문자열의 바이트 수
    */
    getBytes: function (src) {
      var i = 0;
      var sum = 0;
      for (i = 0; i < src.length; i++, sum++) {
        if (escape(src.charAt(i)).length > 4) sum++;
      }
      return sum;
    },

    /**
    * 비밀번호 생성 규칙을 검증합니다.
    * @param {string} pw - 비밀번호 문자열
    * @returns {boolean} 비밀번호가 생성 규칙에 부합하는지 여부
    */
    validatePassword: function (password) {
      console.log("비밀번호 검사");
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:'",.<>?]).{8,15}$/;
      return regex.test(passowrd);
    },
    /**
    * 이메일 유효성을 검사합니다.
    * @param {string} email - 이메일 문자열
    * @returns {boolean} 이메일의 유효성 여부
    */
    validateEmail: function (email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(String(email).toLowerCase());
    }

  },
  /**
  * 상단에 토스트 메시지를 띄웁니다
  * @param {string} text - 메시지 문자열
  * @param {string} position - 메시지 노출 위치 (left, right) 
  */
  showToast: function (text, position) {
    Toastify({
      text: text,
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      position: position || "right", // 메시지 위치
      duration: 2000 // 2초 동안 표시
    }).showToast();
  },

  /**
  * 주어진 객체를 복제하여 새로운 객체를 반환합니다.
  * @param {Object} obj - 복제할 객체
  * @returns {Object} - 복제된 객체
  */
  clone: function (obj) {
    // null 또는 객체가 아닌 경우, 해당 객체를 그대로 반환합니다.
    if (obj === null || typeof (obj) !== 'object')
      return obj;

    // 새로운 객체를 생성합니다.
    var copy = obj.constructor();

    // 객체의 속성을 반복하여 복제합니다.
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr];
      }
    }

    // 복제된 객체를 반환합니다.
    return copy;
  },

  // is-empty를 사용하여 객체가 비어 있는지 확인하는 함수
  isEmpty: function (obj) {
    return isEmpty(obj);
  },

  // 데이터를 암호화
  encrypt: function (data) {
    const encryptedData = CryptoJS.AES.encrypt(data, constant.ENC_KEY).toString();
    return encryptedData;
  },

  // 암호화된 데이터를 복호화
  decrypt: function (encData) {
    const bytes = CryptoJS.AES.decrypt(encData, constant.ENC_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  },
};

export default commonUtil;