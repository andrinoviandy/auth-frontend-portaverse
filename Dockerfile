FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json .
RUN npm i -g vite
COPY .yarn ./.yarn
COPY .yarnrc.yml .
RUN yarn install
COPY . .

ENV VITE_CORPORATE_NAME="KMPlus Consulting"
ENV VITE_FIREBASE_API_KEY="AIzaSyDHb1QG3EEmbAKaPfingVS4r6Enkfeju4I"
ENV VITE_FIREBASE_AUTH_DOMAIN=smartkmsystem-2705f.firebaseapp.com
ENV VITE_FIREBASE_PROJECT_ID=smartkmsystem-2705f
ENV VITE_FIREBASE_STORAGE_BUCKET=smartkmsystem-2705f.appspot.com
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=634072245724
ENV VITE_FIREBASE_APP_ID=1:634072245724:web:bc597de032b02082f95b19
ENV VITE_JWT_KEY=smartkms2022
ENV VITE_API_KEY=smartkms20221

# !IMPORTANT : temporary only, uncomment if merge to master
ENV VITE_API_EMPLOYEES_SERVICE_URL=https://employee-service-portaverse.pelindo.co.id
ENV VITE_API_AUTH_SERVICE_URL=https://user-auth-service-portaverse.pelindo.co.id
ENV VITE_API_CMS_SERVICE_URL=https://cms-service-portaverse.pelindo.co.id
ENV VITE_API_SOCIAL_SERVICE_URL=https://social-portaverse.pelindo.co.id
ENV VITE_API_NOTIFICATIONS_SERVICE_URL=https://notification-portaverse.pelindo.co.id
ENV VITE_API_SMARTPLAN_SERVICE_URL=https://smartplan-service-portaverse.pelindo.co.id
ENV VITE_API_SSO_SERVICE_URL=https://user-auth-service-portaverse.pelindo.co.id
ENV VITE_API_COURSE_SERVICE_URL=https://course-service-portaverse.pelindo.co.id
ENV VITE_KMS_URL=https://knowledge-portaverse.pelindo.co.id
ENV VITE_LMS_URL=https://learning-portaverse.pelindo.co.id
ENV VITE_TMS_URL=https://talent-portaverse.pelindo.co.id
ENV VITE_IMS_URL=https://innovation-portaverse.pelindo.co.id
ENV VITE_CMS_URL=https://culture-portaverse.pelindo.co.id
ENV VITE_NAVBAR_URL=https://navbar-portaverse.pelindo.co.id/assets/remoteEntry.js
ENV VITE_API_SIGNATURE_SERVICE_URL=https://signature-service-portaverse.pelindo.co.id
ENV VITE_API_SEARCH_ENGINE_SERVICE_URL=https://engine-service-portaverse.pelindo.co.id
ENV VITE_API_DAILY_QUIZ_SERVICE_URL=https://daily-quiz-portaverse.pelindo.co.id
ENV VITE_API_ASSESSMENT_SERVICE_URL=https://assessment-service-portaverse.pelindo.co.id 
ENV VITE_API_DEVELOPMENT_PLAN_SERVICE_URL=https://developmentplan-service-portaverse.pelindo.co.id
ENV VITE_API_INNOVATION_SERVICE_URL=https://innovation-service-portaverse.pelindo.co.id
ENV VITE_API_KMAP_SERVICE_URL=https://kmap-service-portaverse.pelindo.co.id
ENV VITE_API_GAMIFICATION_SERVICE_URL=https://gamification-portaverse.pelindo.co.id

# ENV VITE_API_EMPLOYEES_SERVICE_URL=https://employee.portaverse.co.id
# ENV VITE_API_AUTH_SERVICE_URL=https://user-auth.portaverse.co.id
# ENV VITE_API_SOCIAL_SERVICE_URL=https://social.portaverse.co.id
# ENV VITE_API_SSO_SERVICE_URL=https://user-auth.portaverse.co.id
# ENV VITE_API_NOTIFICATIONS_SERVICE_URL=https://notification.portaverse.co.id
# ENV VITE_API_SMARTPLAN_SERVICE_URL=https://smartplan.portaverse.co.id
# ENV VITE_API_COURSE_SERVICE_URL=https://course.portaverse.co.id
# ENV VITE_KMS_URL=https://knowledge.portaverse.co.id
# ENV VITE_LMS_URL=https://learning.portaverse.co.id
# ENV VITE_TMS_URL=https://talent.portaverse.co.id
# ENV VITE_API_SIGNATURE_SERVICE_URL=https://signature.portaverse.co.id

RUN yarn build

FROM nginx:stable-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
