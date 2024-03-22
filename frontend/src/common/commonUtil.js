import _ from 'lodash';
import moment from 'moment';
import isEmpty from 'is-empty';

const commonUtil = {
    // lodash를 사용하여 배열의 합을 구하는 함수
    sumArray: function(arr) {
      return _.sum(arr);
    },
    // moment를 사용하여 현재 시간을 포맷팅하는 함수
    formatCurrentTime: function() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    },
    // is-empty를 사용하여 객체가 비어 있는지 확인하는 함수
    isEmpty: function(obj) {
      return isEmpty(obj);
    }
};

export default commonUtil;