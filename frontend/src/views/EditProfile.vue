<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow p-3 mb-5 bg-body rounded">
                    <div class="card-body">
                        <h5 class="card-title mb-4">회원정보 수정</h5>
                        <div class="text-center mb-4 profile-thumbnail-container" @click="triggerFileInput()">
                            <img :src="this.userData.profileImage" alt="Profile Image" class="rounded-circle profile-thumbnail">
                            <div class="overlay">
                                <div class="text">변경</div>
                            </div>
                        </div>
                        <input type="file" ref="fileInput" @change="uploadProfileImage" accept="image/*" class="d-none">
                        <form @submit.prevent="updateUser">
                            <div class="mb-3">
                                <label for="id" class="form-label">아이디</label>
                                <input type="text" class="form-control" id="id" v-model="userData.id" disabled>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">새로운 비밀번호 입력</label>
                                <input type="password" class="form-control" id="password" v-model="userData.password"
                                    @focusout="validateInput('password')" required autocomplete="off">
                            </div>
                            <div class="mb-3">
                                <label for="password2" class="form-label">새로운 비밀번호 확인</label>
                                <input type="password" class="form-control" id="password2" v-model="userData.password2"
                                    @focusout="validateInput('password2')" required autocomplete="off">
                            </div>
                            <div class="mb-3">
                                <label for="name" class="form-label">이름</label>
                                <input type="text" class="form-control" id="name" v-model="userData.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="age" class="form-label">나이</label>
                                <input type="number" maxlength="3" class="form-control" id="age" v-model="userData.age"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">전화번호</label>
                                <input type="text" maxlength="11" class="form-control" id="phone"
                                    v-model="userData.phone" @keypress="validateInput('phone')" required>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <BaseButton className="btn btn-danger" type="button"
                                    :clickHandler="() => $goToPage('Index')">
                                    취소</BaseButton>
                                <BaseButton className="btn btn-primary" type="submit">
                                    수정하기</BaseButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';

export default {
    components: {
        BaseButton
    },
    data() {
        return {
            userData: {
                id: this.$store.getters.user.id,
                password: '',
                password2: '',
                name: this.$store.getters.user.name,
                age: this.$store.getters.user.age,
                phone: this.$store.getters.user.phone,
                profileImage: this.$store.getters.user.profileImageBase64,
                profileImageBlob : null,
            },
            defaultImageUrl: 'https://image.yes24.com/goods/103555529/XL' // 기본 프로필 이미지 URL
        };
    },
    computed: {
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        // 이미지 업로드
        uploadProfileImage(event){
            console.log('업로드 함수 실행됨!');
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64String = e.target.result;
                this.userData.profileImage = base64String;

                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0, img.width, img.height);

                    canvas.toBlob((blob) => {
                        this.userData.profileImageBlob = blob;
                    }, 'image/jpeg', 0.8);
                };
                img.src = e.target.result;
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        },
        loadBase64Image() {
            if (this.userData.profileImage) {
                return `data:image/jpeg;base64,${this.userData.profileImage}`;
            }
        },
        // 입력 값 유효성 검사
        validateInput(type) {
            if (type === 'password') {
                const passYn = this.$commonUtil.stringUtil.validatePassword(this.userData.password);
                if (!passYn) {
                    this.userData.password = '';
                    alert('비밀번호는 최소 8자 이상이어야 하며 영문, 숫자, 특수문자를 포함해야 합니다.');
                }
            } else if (type === 'password2') {
                // password1과 password2 비교
                if (!this.$commonUtil.isEmpty(this.userData.password2)) {
                    if (this.userData.password !== this.userData.password2) {
                        this.userData.password2 = '';
                        alert('비밀번호가 일치하지 않습니다.');
                    }
                } else {
                    alert('새로운 비밀번호 확인을 입력해주세요.');
                }
            } else if (type === 'phone') {
                const keyCode = event.keyCode;
                // 입력된 키가 숫자가 아니면 입력을 막음
                if (!(keyCode >= 48 && keyCode <= 57)) {
                    event.preventDefault();
                }
            }
        },
        // 회원 정보 수정 요청
        updateUser() {
            const formData = new FormData();
            formData.append('id', this.userData.id);
            formData.append('password', this.userData.password);
            formData.append('name', this.userData.name);
            formData.append('age', this.userData.age);
            formData.append('phone', this.userData.phone);
            if (this.userData.profileImageBlob) {
                formData.append('profileImageBlob', this.userData.profileImageBlob);
            }

            this.$axios.patch(`/api/user/${this.userData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.$store.commit('setUser', response.data);
                    alert('사용자 정보가 성공적으로 업데이트되었습니다.');
                    this.$goToPage('Index');
                })
                .catch(error => {
                    console.error(error);
                    alert('사용자 정보 업데이트에 실패했습니다.');
                });
        }
    }
};
</script>

<style>
/* 배경색 설정 */
body {
    background-color: #f2f2f2;
    /* 연한 회색 */
}

/* 카드 스타일 설정 */
.card {
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 입력란 스타일 설정 */
.form-control {
    border-radius: 15px;
    /* 둥근 테두리 */
}

/* 수정하기 버튼 스타일 설정 */
.btn-primary {
    border-radius: 15px;
    /* 둥근 테두리 */
}
.profile-thumbnail-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.profile-thumbnail {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-thumbnail-container:hover .overlay {
    opacity: 1;
}

.text {
    color: white;
    font-size: 16px;
}

.d-none {
    display: none;
}
</style>