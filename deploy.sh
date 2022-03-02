#!/usr/bin/env sh

# 오류 발생시 중단한다.
set -e

today=`date`

# 문서(md)를 build하여 html로 만든다. 
# npm run build

# build가 output된 폴더로 이동한다. 
# cd ./dist

# init + add + commit을 해준 다음
git init
git add -A
git commit -m "deploy $today"

# https://<USERNAME>.github.io 에 배포하는 경우
# git push -f https://github.com/<USERNAME>/<USERNAME>.github.io.git master

# https://<USERNAME>.github.io/<REPO> 에 배포하는 경우
# 가 아니라 git초기화 된 디렉토리에서는 master:<branch>로 해줘야한다.
# git push -f https://github.com/<USERNAME>/<REPO>.git master:gh-pages

# 필자의 경우 TIL repository에 배포하기 때문에 아래와 같이 작성했다.
git push -f https://github.com/kkn1125/wikimson.git main

# cd -