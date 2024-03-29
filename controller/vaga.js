const { PaginationParameters } = require("mongoose-paginate-v2");
const Vaga = require("../models/Vaga");

exports.add = async (req, res) => {
  try {
    const {
      empresa,
      cargo,
      tipo,
      descricao,
      formato,
      requisitos,
      habilidades,
      beneficios,
      localidade,
    } = req.body;

    const vaga = new Vaga({
      empresa,
      cargo,
      tipo,
      descricao,
      formato,
      requisitos,
      habilidades,
      beneficios,
      localidade,
    });
    await vaga.save();

    return res.json({ status: "Vaga adicionada com sucesso!", vaga });
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.get = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const vagas = await Vaga.paginate({}, { page, limit: 10 });

    return res.json(vagas);
  } catch (e) {
    return res.status(500).json({ stauts: "Erro!", erorr: e });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params._id;
    const vaga = await Vaga.findById(id);
    return res.json(vaga);
  } catch (error) {
    return res.status(404).json({
      error: true,
      code: "vaga.notfound",
      message: "ops nao encontramos sua vaga",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params._id;

    await Vaga.findByIdAndDelete(id).then(() => {
      return res.json({ message: "Vaga deletada com sucesso!" });
    });
  } catch (e) {
    return res.status(400).json({ status: "Erro!", error: e });
  }
};

exports.param = async (req, res) => {
  try {
    if (req.params.filter === "tipo") {
      const tipo = await Vaga.distinct("tipo");
      res.json(tipo);
    } else if (req.params.filter === "instituicao") {
      const instituicao = await Vaga.distinct("instituicao");
      res.json(instituicao);
    } else if (req.params.filter === "cargo") {
      const cargo = await Vaga.distinct("cargo");
      res.json(cargo);
    } else if (req.params.filter === "localidade") {
      const localidade = await Vaga.distinct("localidade");
      res.json(localidade);
    } else if (req.params.filter === "filters") {
      const instituicao = await Vaga.distinct("instituicao");
      const tipo = await Vaga.distinct("tipo");
      const cargo = await Vaga.distinct("cargo");
      const localidades = await Vaga.distinct("localidade");
      res.json({
        instituicoes: instituicao,
        tipos: tipo,
        cargos: cargo,
        localidades: localidades,
      });
    }
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.filter = async (req, res) => {
  try {
    console.log(req.body);
    const results = await Vaga.find(req.body);
    res.json(results);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};
