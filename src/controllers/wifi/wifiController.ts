import { Request, Response } from "express";
import handleError from "../../middlewares/handleErrorMiddleware.js";
import {
  createWifi,
  deleteWifi,
  findAllUsersById,
  findById,
} from "../../services/wifiService.js";
import { decryptString, encryptString } from "../../utils/cryptography.js";

export async function postWifi(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const { label, ssid, password } = req.body;
    const encryptedPassword = encryptString(password);
    const data = {
      userId: user.id,
      label,
      ssid,
      password: encryptedPassword,
    };
    const wifi = await createWifi(data);
    res.status(201).json(wifi);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getAllUsersWifis(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const wifis = await findAllUsersById(user.id);
    res.status(200).json(
      Array(wifis).map((wifi: any) => ({
        ...wifi,
        password: decryptString(wifi.password),
      }))
    );
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function getWifiById(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const wifi = await findById(id);
    if (wifi.userId !== user.id)
      throw { type: "not_found", message: "Wifi not found" };
    res.status(200).json({
      ...wifi,
      password: decryptString(wifi.password),
    });
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}

export async function deleteWifis(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const wifi = await findById(id);
    if (wifi.userId !== user.id)
      throw { type: "not_found", message: "Credential not found" };
    await deleteWifi(id);
    res.sendStatus(204);
  } catch (error: { type: string; message: string } | any) {
    return handleError(error, req, res);
  }
}
