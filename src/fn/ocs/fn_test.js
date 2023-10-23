export default async (
  /** @type {any} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: import("sequelize").Model<any, any>[]): void; new (): any; }; }; }} */ res,
  /** @type {any} */ data
) => {
  try {
    // @ts-ignore
    res.status(200).json({ now: Date.now() });
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};
