<template>
    <button :type="type" :class="className"  @click="handleButtonClick">
      <slot></slot>
    </button>
  </template>
  
  <script>
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
      clickHandler: Function // 부모로부터 받은 함수를 실행하기 위한 prop 추가
    },
    computed: {

    },
    methods: {
        handleButtonClick(event) {
            console.log('자식에서 받아서 함수호출 ::');
            this.clickHandler(event); // 부모로부터 받은 함수를 실행
      }
    }
  };
  </script>
  
  <style>
  /* 필요한 경우 버튼에 대한 전반적인 스타일링 추가 가능 */
  </style>