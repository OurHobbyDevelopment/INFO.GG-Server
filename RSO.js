import axios from "axios";
import { Request, Response, Router } from "express";

const router = Router();

// 로그인한 유저의 정보를 캐싱할 authMap
const authMap = new Map();

const appCallbackUrl = `${process.env.VALIN2_URL}/`;

const tokenUrl = "https://auth.riotgames.com/token";

const clientID = process.env.RSO_CLIENT_ID,
  clientSecret = process.env.RSO_CLIENT_SECRET;

const axiosConfig = {
  auth: {
    username: clientID,
    password: clientSecret,
  },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

router.get("/oauth", async (req, res) => {
  const { code } = req.query;

  let params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", appCallbackUrl);

  try {
    // 유저가 로그인하여 얻은 code로 token data를 받아온 뒤 id_token 분리
    const payload = await axios
      .post(tokenUrl, params, axiosConfig)
      .then((res) => res.data);

    const id_token = payload.id_token;
    const tokens = {
      refresh_token: payload.refresh_token,
      access_token: payload.access_token,
      expires_in: payload.expires_in,
      token_type: payload.token_type,
    };

    // access_token를 사용해 유저 정보를 불러옴
    const userInfo = await axios
      .get("https://asia.api.riotgames.com/riot/account/v1/accounts/me", {
        headers: {
          Authorization: `${tokens.token_type} ${tokens.access_token}`,
        },
      })
      .then((res) => res.data);

    // id_token 토큰을 key 값으로 토큰 정보와 유저 정보를 authMap에 저장 (이후에 id_token을 사용해 토큰 및 유저 데이터에 접근하기 위함)
    if (userInfo) {
      authMap.set(id_token, {
        ...userInfo,
        ...tokens,
      });
    }

    // 유저 닉네임을 표시하기 위한 userInfo와 캐싱된 유저 토큰 정보를 찾기 위한 key 값인 id_token만 클라이언트로 전달
    return res.send({
      result: true,
      authData: {
        id_token,
        userInfo: {
          gameName: userInfo.gameName,
          tagLine: userInfo.tagLine,
        },
      },
    });
  } catch (error) {
    console.timeLog(error);
    return res.status(400);
  }
});

export default router;
