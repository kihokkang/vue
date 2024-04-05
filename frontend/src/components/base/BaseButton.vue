<template>
  <button :type="type" :class="className" @click="handleButtonClick">
    <slot></slot>
  </button>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button' // 기본 타입은 'button'으로 설정
    },
    className: {
      type: String,
      default: '' // 버튼 스타일의 변형을 위한 클래스
    },
    clickHandler: {
      type: Function,
      default: null // 부모로부터 받은 함수를 실행하기 위한 prop, 기본값은 null
    },
    debounceEnabled: {
      type: Boolean,
      default: false // 기본적으로 debounce 비활성화 (API를 호출하는 Button은 사용할것)
    }
  },
  methods: {
    handleButtonClick(event) {
      if (this.debounceEnabled) {
        // debounce 활성화 상태일 때만 debounce 함수 적용
        this.debounceClickHandler(event);
      } else {
        // debounce 비활성화 상태일 때는 바로 clickHandler 실행
        if (typeof this.clickHandler === 'function') {
          this.clickHandler(event);
        }
      }
    },
    debounceClickHandler: _.debounce(function(event) {
      if (typeof this.clickHandler === 'function') {
        this.clickHandler(event);
      }
    }, 300) // debounce 지연 시간 설정 (여기서는 300ms)
  }
};
</script>

<style>
/* 필요한 경우 버튼에 대한 전반적인 스타일링 추가 가능 */
</style>