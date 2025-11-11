// import {
//     type EsvRowType,
//     QuickEsv,
//     EsvFilterOperator,
//     Operations,
//     ManualEsv,
//     type EsvFilterType,
// } from "./index.ts";

import {
    EsvFilterOperator,
    QuickEsv,
    Operations,
    ManualEsv,
    type EsvFilterType,
    type EsvRowType,
} from "../dist";

const filters = [
    { field: "Cidade", value: "Rio de Janeiro", operator: EsvFilterOperator.Equals },
    { field: "Profissao", value: "Empresário", operator: EsvFilterOperator.NotEquals },
    { field: "Idade", value: 20, operator: EsvFilterOperator.LessThanOrEqual },
];

async function run() {
    await filter();
   // await update();
   // await filter();
}

async function read() {
    const esvViewModel = new QuickEsv();

    const list = await esvViewModel.readEsvFile("public/esvFile.esv", 10, 10, "🟩");
    console.log(list);
}

async function filter() {
    const esvViewModel = new QuickEsv();

    const filterList = await esvViewModel.filterEsvFile("public/esvFile.esv", 0, 10, filters, "🟩");
    console.log(filterList);
}

async function update() {
    const esvViewModel = new QuickEsv();

    await esvViewModel.updateEsvFile(
        "public/esvFile.esv",
        { Nome: "João", Idade: "28", Cidade: "Rio de Janeiro", Profissao: "Arquiteta" },
        filters,
        "🟩"
    );
}

async function appendFile() {
    const esvViewModel = new QuickEsv();

    await esvViewModel.writeEsvFile("public/esvFile.esv", list, "🟩");
}

async function delte() {
    const esvViewModel = new QuickEsv();
    await esvViewModel.deleteEsvFile("public/esvFile.esv", filters, "🟩");
}

const list = [
    {
        Nome: "João",
        Idade: "28",
        Cidade: "Rio de Janeiro",
        Profissao: "Arquiteta",
    },
    { Nome: "Lucas", Idade: "36", Cidade: "Belém", Profissao: "Designer" },
    {
        Nome: "Isabela",
        Idade: "51",
        Cidade: "Rio de Janeiro",
        Profissao: "Empresário",
    },
    {
        Nome: "Isabela",
        Idade: "35",
        Cidade: "Recife",
        Profissao: "Técnico",
    },
    {
        Nome: "Vanessa",
        Idade: "31",
        Cidade: "Salvador",
        Profissao: "Jornalista",
    },
    {
        Nome: "Vanessa",
        Idade: "49",
        Cidade: "Belém",
        Profissao: "Empresário",
    },
    { Nome: "Karla", Idade: "34", Cidade: "Recife", Profissao: "Técnico" },
    {
        Nome: "Vanessa",
        Idade: "32",
        Cidade: "Porto Alegre",
        Profissao: "Técnico",
    },
    {
        Nome: "Carla",
        Idade: "32",
        Cidade: "Salvador",
        Profissao: "Jornalista",
    },
    {
        Nome: "Lucas",
        Idade: "44",
        Cidade: "Curitiba",
        Profissao: "Enfermeira",
    },
    {
        Nome: "Isabela",
        Idade: "46",
        Cidade: "Curitiba",
        Profissao: "Cozinheiro",
    },
    {
        Nome: "Thiago",
        Idade: "60",
        Cidade: "Curitiba",
        Profissao: "Biólogo",
    },
    {
        Nome: "Giovana",
        Idade: "27",
        Cidade: "Salvador",
        Profissao: "Desenvolvedor",
    },
    {
        Nome: "Lucas",
        Idade: "49",
        Cidade: "Fortaleza",
        Profissao: "Biólogo",
    },
    {
        Nome: "Carla",
        Idade: "28",
        Cidade: "Curitiba",
        Profissao: "Gerente",
    },
    {
        Nome: "Vanessa",
        Idade: "45",
        Cidade: "Brasília",
        Profissao: "Professora",
    },
    {
        Nome: "Marcos",
        Idade: "46",
        Cidade: "São Paulo",
        Profissao: "Gerente",
    },
    {
        Nome: "Sofia",
        Idade: "35",
        Cidade: "Fortaleza",
        Profissao: "Advogado",
    },
    {
        Nome: "Thiago",
        Idade: "56",
        Cidade: "Curitiba",
        Profissao: "Engenheira",
    },
    {
        Nome: "Marcos",
        Idade: "25",
        Cidade: "Rio de Janeiro",
        Profissao: "Analista",
    },
    {
        Nome: "Bruno",
        Idade: "35",
        Cidade: "Fortaleza",
        Profissao: "Gerente",
    },
    {
        Nome: "Paula",
        Idade: "48",
        Cidade: "Curitiba",
        Profissao: "Vendedor",
    },
    {
        Nome: "Giovana",
        Idade: "44",
        Cidade: "Fortaleza",
        Profissao: "Designer",
    },
    {
        Nome: "Felipe",
        Idade: "44",
        Cidade: "Recife",
        Profissao: "Estudante",
    },
    {
        Nome: "Ana",
        Idade: "31",
        Cidade: "Porto Alegre",
        Profissao: "Designer",
    },
    {
        Nome: "Carla",
        Idade: "59",
        Cidade: "Curitiba",
        Profissao: "Biólogo",
    },
    {
        Nome: "Giovana",
        Idade: "57",
        Cidade: "Belém",
        Profissao: "Contador",
    },
    {
        Nome: "João",
        Idade: "50",
        Cidade: "Curitiba",
        Profissao: "Analista",
    },
    {
        Nome: "Elisa",
        Idade: "22",
        Cidade: "Fortaleza",
        Profissao: "Biólogo",
    },
    {
        Nome: "Thiago",
        Idade: "24",
        Cidade: "Recife",
        Profissao: "Cozinheiro",
    },
    {
        Nome: "Felipe",
        Idade: "28",
        Cidade: "Brasília",
        Profissao: "Psicólogo",
    },
    {
        Nome: "Ana",
        Idade: "51",
        Cidade: "São Paulo",
        Profissao: "Empresário",
    },
    {
        Nome: "Felipe",
        Idade: "25",
        Cidade: "Porto Alegre",
        Profissao: "Motorista",
    },
    {
        Nome: "Vanessa",
        Idade: "24",
        Cidade: "Salvador",
        Profissao: "Empresário",
    },
    {
        Nome: "Otávio",
        Idade: "58",
        Cidade: "Porto Alegre",
        Profissao: "Arquiteta",
    },
    {
        Nome: "Diego",
        Idade: "51",
        Cidade: "Brasília",
        Profissao: "Motorista",
    },
    {
        Nome: "Thiago",
        Idade: "42",
        Cidade: "Belo Horizonte",
        Profissao: "Gerente",
    },
    {
        Nome: "Sofia",
        Idade: "39",
        Cidade: "Fortaleza",
        Profissao: "Empresário",
    },
    {
        Nome: "Giovana",
        Idade: "50",
        Cidade: "São Paulo",
        Profissao: "Cozinheiro",
    },
    {
        Nome: "Ana",
        Idade: "37",
        Cidade: "São Paulo",
        Profissao: "Psicólogo",
    },
    {
        Nome: "Giovana",
        Idade: "50",
        Cidade: "Salvador",
        Profissao: "Designer",
    },
    {
        Nome: "Vanessa",
        Idade: "32",
        Cidade: "Fortaleza",
        Profissao: "Professora",
    },
    {
        Nome: "Hugo",
        Idade: "31",
        Cidade: "Rio de Janeiro",
        Profissao: "Vendedor",
    },
    {
        Nome: "Vanessa",
        Idade: "29",
        Cidade: "Belém",
        Profissao: "Analista",
    },
    { Nome: "João", Idade: "31", Cidade: "Belém", Profissao: "Professora" },
    {
        Nome: "Thiago",
        Idade: "43",
        Cidade: "São Paulo",
        Profissao: "Advogado",
    },
    {
        Nome: "Otávio",
        Idade: "50",
        Cidade: "Brasília",
        Profissao: "Técnico",
    },
    {
        Nome: "Diego",
        Idade: "40",
        Cidade: "São Paulo",
        Profissao: "Empresário",
    },
    {
        Nome: "Hugo",
        Idade: "35",
        Cidade: "Belo Horizonte",
        Profissao: "Arquiteta",
    },
    {
        Nome: "Giovana",
        Idade: "20",
        Cidade: "São Paulo",
        Profissao: "Gerente",
    },
    {
        Nome: "Thiago",
        Idade: "55",
        Cidade: "Salvador",
        Profissao: "Advogado",
    },
    {
        Nome: "Giovana",
        Idade: "49",
        Cidade: "Salvador",
        Profissao: "Engenheira",
    },
    {
        Nome: "Karla",
        Idade: "60",
        Cidade: "Porto Alegre",
        Profissao: "Jornalista",
    },
    {
        Nome: "Carla",
        Idade: "27",
        Cidade: "Porto Alegre",
        Profissao: "Técnico",
    },
    {
        Nome: "Karla",
        Idade: "22",
        Cidade: "Rio de Janeiro",
        Profissao: "Advogado",
    },
    {
        Nome: "João",
        Idade: "49",
        Cidade: "Porto Alegre",
        Profissao: "Cozinheiro",
    },
    { Nome: "Sofia", Idade: "20", Cidade: "Salvador", Profissao: "Médica" },
    {
        Nome: "Isabela",
        Idade: "54",
        Cidade: "Recife",
        Profissao: "Jornalista",
    },
    {
        Nome: "Marcos",
        Idade: "56",
        Cidade: "Salvador",
        Profissao: "Estudante",
    },
    {
        Nome: "Isabela",
        Idade: "32",
        Cidade: "Rio de Janeiro",
        Profissao: "Professora",
    },
    {
        Nome: "Marcos",
        Idade: "24",
        Cidade: "Fortaleza",
        Profissao: "Vendedor",
    },
    {
        Nome: "Hugo",
        Idade: "56",
        Cidade: "Salvador",
        Profissao: "Motorista",
    },
    {
        Nome: "Felipe",
        Idade: "50",
        Cidade: "Fortaleza",
        Profissao: "Motorista",
    },
    {
        Nome: "Bruno",
        Idade: "52",
        Cidade: "Belém",
        Profissao: "Jornalista",
    },
    {
        Nome: "Lucas",
        Idade: "51",
        Cidade: "Porto Alegre",
        Profissao: "Professora",
    },
    {
        Nome: "Karla",
        Idade: "30",
        Cidade: "Curitiba",
        Profissao: "Gerente",
    },
    {
        Nome: "Felipe",
        Idade: "22",
        Cidade: "Porto Alegre",
        Profissao: "Técnico",
    },
    {
        Nome: "Paula",
        Idade: "43",
        Cidade: "Fortaleza",
        Profissao: "Jornalista",
    },
    {
        Nome: "Otávio",
        Idade: "50",
        Cidade: "Brasília",
        Profissao: "Estudante",
    },
    {
        Nome: "Lucas",
        Idade: "33",
        Cidade: "Fortaleza",
        Profissao: "Cozinheiro",
    },
    {
        Nome: "Paula",
        Idade: "22",
        Cidade: "Belo Horizonte",
        Profissao: "Estudante",
    },
    {
        Nome: "Isabela",
        Idade: "30",
        Cidade: "São Paulo",
        Profissao: "Contador",
    },
    {
        Nome: "Carla",
        Idade: "32",
        Cidade: "Salvador",
        Profissao: "Gerente",
    },
    {
        Nome: "Otávio",
        Idade: "59",
        Cidade: "Curitiba",
        Profissao: "Enfermeira",
    },
    {
        Nome: "Hugo",
        Idade: "50",
        Cidade: "Belo Horizonte",
        Profissao: "Psicólogo",
    },
    {
        Nome: "Felipe",
        Idade: "54",
        Cidade: "Salvador",
        Profissao: "Vendedor",
    },
    {
        Nome: "Karla",
        Idade: "34",
        Cidade: "Belo Horizonte",
        Profissao: "Jornalista",
    },
    {
        Nome: "Felipe",
        Idade: "46",
        Cidade: "Belo Horizonte",
        Profissao: "Contador",
    },
    {
        Nome: "Karla",
        Idade: "44",
        Cidade: "Salvador",
        Profissao: "Jornalista",
    },
    {
        Nome: "Lucas",
        Idade: "48",
        Cidade: "Belém",
        Profissao: "Empresário",
    },
    {
        Nome: "Ana",
        Idade: "43",
        Cidade: "Rio de Janeiro",
        Profissao: "Psicólogo",
    },
    {
        Nome: "Sofia",
        Idade: "26",
        Cidade: "Curitiba",
        Profissao: "Contador",
    },
    {
        Nome: "Vanessa",
        Idade: "40",
        Cidade: "Curitiba",
        Profissao: "Gerente",
    },
    { Nome: "Nina", Idade: "39", Cidade: "Belém", Profissao: "Analista" },
    {
        Nome: "Vanessa",
        Idade: "21",
        Cidade: "Curitiba",
        Profissao: "Arquiteta",
    },
    {
        Nome: "João",
        Idade: "50",
        Cidade: "Rio de Janeiro",
        Profissao: "Estudante",
    },
    { Nome: "Diego", Idade: "48", Cidade: "Belém", Profissao: "Biólogo" },
    {
        Nome: "Thiago",
        Idade: "29",
        Cidade: "Brasília",
        Profissao: "Médica",
    },
    { Nome: "Marcos", Idade: "37", Cidade: "Belém", Profissao: "Contador" },
    { Nome: "Ana", Idade: "45", Cidade: "Brasília", Profissao: "Gerente" },
    {
        Nome: "Thiago",
        Idade: "46",
        Cidade: "Belém",
        Profissao: "Enfermeira",
    },
    {
        Nome: "Paula",
        Idade: "28",
        Cidade: "Salvador",
        Profissao: "Analista",
    },
    {
        Nome: "Isabela",
        Idade: "38",
        Cidade: "Belo Horizonte",
        Profissao: "Médica",
    },
    {
        Nome: "Vanessa",
        Idade: "54",
        Cidade: "Recife",
        Profissao: "Designer",
    },
    {
        Nome: "Thiago",
        Idade: "28",
        Cidade: "Rio de Janeiro",
        Profissao: "Desenvolvedor",
    },
    {
        Nome: "Bruno",
        Idade: "43",
        Cidade: "Salvador",
        Profissao: "Designer",
    },
    {
        Nome: "Marcos",
        Idade: "42",
        Cidade: "Porto Alegre",
        Profissao: "Psicólogo",
    },
    {
        Nome: "Nina",
        Idade: "49",
        Cidade: "Rio de Janeiro",
        Profissao: "Engenheira",
    },
    {
        Nome: "Bruno",
        Idade: "20",
        Cidade: "Rio de Janeiro",
        Profissao: "Empresário",
    },
    { Nome: "João", Idade: "51", Cidade: "Recife", Profissao: "Médica" },
    {
        Nome: "Carla",
        Idade: "40",
        Cidade: "Salvador",
        Profissao: "Técnico",
    },
    {
        Nome: "Elisa",
        Idade: "48",
        Cidade: "São Paulo",
        Profissao: "Advogado",
    },
    {
        Nome: "Vanessa",
        Idade: "39",
        Cidade: "São Paulo",
        Profissao: "Médica",
    },
    {
        Nome: "Hugo",
        Idade: "57",
        Cidade: "São Paulo",
        Profissao: "Advogado",
    },
    { Nome: "Hugo", Idade: "22", Cidade: "Belém", Profissao: "Cozinheiro" },
    {
        Nome: "Elisa",
        Idade: "49",
        Cidade: "Belo Horizonte",
        Profissao: "Desenvolvedor",
    },
    {
        Nome: "Nina",
        Idade: "22",
        Cidade: "Rio de Janeiro",
        Profissao: "Vendedor",
    },
    {
        Nome: "Felipe",
        Idade: "37",
        Cidade: "Belo Horizonte",
        Profissao: "Contador",
    },
    {
        Nome: "Elisa",
        Idade: "32",
        Cidade: "Salvador",
        Profissao: "Professora",
    },
    {
        Nome: "Giovana",
        Idade: "49",
        Cidade: "Belém",
        Profissao: "Professora",
    },
    {
        Nome: "Carla",
        Idade: "60",
        Cidade: "Belo Horizonte",
        Profissao: "Psicólogo",
    },
    { Nome: "Hugo", Idade: "47", Cidade: "Belém", Profissao: "Jornalista" },
    {
        Nome: "Marcos",
        Idade: "23",
        Cidade: "São Paulo",
        Profissao: "Empresário",
    },
    { Nome: "Ana", Idade: "59", Cidade: "Salvador", Profissao: "Designer" },
    {
        Nome: "Hugo",
        Idade: "42",
        Cidade: "Brasília",
        Profissao: "Empresário",
    },
    {
        Nome: "Karla",
        Idade: "40",
        Cidade: "Brasília",
        Profissao: "Enfermeira",
    },
    { Nome: "Paula", Idade: "28", Cidade: "Belém", Profissao: "Motorista" },
    {
        Nome: "Paula",
        Idade: "43",
        Cidade: "Porto Alegre",
        Profissao: "Biólogo",
    },
    {
        Nome: "Lucas",
        Idade: "38",
        Cidade: "Salvador",
        Profissao: "Motorista",
    },
    {
        Nome: "Rafael",
        Idade: "60",
        Cidade: "Fortaleza",
        Profissao: "Engenheira",
    },
    {
        Nome: "Karla",
        Idade: "42",
        Cidade: "Belo Horizonte",
        Profissao: "Designer",
    },
    {
        Nome: "Lucas",
        Idade: "32",
        Cidade: "Porto Alegre",
        Profissao: "Enfermeira",
    },
    {
        Nome: "Isabela",
        Idade: "37",
        Cidade: "Curitiba",
        Profissao: "Empresário",
    },
    {
        Nome: "Nina",
        Idade: "33",
        Cidade: "Belo Horizonte",
        Profissao: "Empresário",
    },
    {
        Nome: "João",
        Idade: "20",
        Cidade: "Fortaleza",
        Profissao: "Estudante",
    },
    { Nome: "Hugo", Idade: "26", Cidade: "Recife", Profissao: "Psicólogo" },
    { Nome: "Bruno", Idade: "22", Cidade: "Belém", Profissao: "Analista" },
    {
        Nome: "Marcos",
        Idade: "35",
        Cidade: "Brasília",
        Profissao: "Médica",
    },
    {
        Nome: "Karla",
        Idade: "52",
        Cidade: "Rio de Janeiro",
        Profissao: "Arquiteta",
    },
    {
        Nome: "Diego",
        Idade: "43",
        Cidade: "Brasília",
        Profissao: "Engenheira",
    },
    {
        Nome: "Rafael",
        Idade: "47",
        Cidade: "Recife",
        Profissao: "Enfermeira",
    },
    {
        Nome: "Nina",
        Idade: "58",
        Cidade: "Salvador",
        Profissao: "Psicólogo",
    },
    {
        Nome: "Paula",
        Idade: "27",
        Cidade: "Fortaleza",
        Profissao: "Desenvolvedor",
    },
    {
        Nome: "Elisa",
        Idade: "26",
        Cidade: "Salvador",
        Profissao: "Cozinheiro",
    },
    {
        Nome: "Thiago",
        Idade: "44",
        Cidade: "Rio de Janeiro",
        Profissao: "Médica",
    },
    {
        Nome: "Rafael",
        Idade: "49",
        Cidade: "Curitiba",
        Profissao: "Técnico",
    },
    {
        Nome: "Bruno",
        Idade: "52",
        Cidade: "São Paulo",
        Profissao: "Psicólogo",
    },
    {
        Nome: "Paula",
        Idade: "24",
        Cidade: "Fortaleza",
        Profissao: "Professora",
    },
    {
        Nome: "Rafael",
        Idade: "36",
        Cidade: "Curitiba",
        Profissao: "Vendedor",
    },
    {
        Nome: "Elisa",
        Idade: "33",
        Cidade: "Porto Alegre",
        Profissao: "Professora",
    },
    {
        Nome: "Bruno",
        Idade: "59",
        Cidade: "Brasília",
        Profissao: "Enfermeira",
    },
    {
        Nome: "Lucas",
        Idade: "47",
        Cidade: "Curitiba",
        Profissao: "Jornalista",
    },
    { Nome: "Carla", Idade: "22", Cidade: "Recife", Profissao: "Técnico" },
    {
        Nome: "Marcos",
        Idade: "54",
        Cidade: "Belo Horizonte",
        Profissao: "Médica",
    },
    {
        Nome: "Marcos",
        Idade: "38",
        Cidade: "Brasília",
        Profissao: "Desenvolvedor",
    },
    {
        Nome: "Giovana",
        Idade: "20",
        Cidade: "São Paulo",
        Profissao: "Designer",
    },
    {
        Nome: "Nina",
        Idade: "59",
        Cidade: "Recife",
        Profissao: "Professora",
    },
    {
        Nome: "Vanessa",
        Idade: "25",
        Cidade: "Porto Alegre",
        Profissao: "Contador",
    },
    {
        Nome: "João",
        Idade: "20",
        Cidade: "Rio de Janeiro",
        Profissao: "Engenheira",
    },
    {
        Nome: "Felipe",
        Idade: "22",
        Cidade: "Belo Horizonte",
        Profissao: "Estudante",
    },
    {
        Nome: "Bruno",
        Idade: "46",
        Cidade: "Fortaleza",
        Profissao: "Estudante",
    },
    {
        Nome: "Rafael",
        Idade: "59",
        Cidade: "Brasília",
        Profissao: "Engenheira",
    },
    {
        Nome: "Nina",
        Idade: "55",
        Cidade: "Rio de Janeiro",
        Profissao: "Estudante",
    },
    {
        Nome: "Paula",
        Idade: "49",
        Cidade: "Brasília",
        Profissao: "Motorista",
    },
    {
        Nome: "Hugo",
        Idade: "44",
        Cidade: "Fortaleza",
        Profissao: "Cozinheiro",
    },
    {
        Nome: "Elisa",
        Idade: "30",
        Cidade: "São Paulo",
        Profissao: "Estudante",
    },
    {
        Nome: "Sofia",
        Idade: "36",
        Cidade: "Porto Alegre",
        Profissao: "Analista",
    },
    {
        Nome: "Bruno",
        Idade: "24",
        Cidade: "Curitiba",
        Profissao: "Jornalista",
    },
    {
        Nome: "Karla",
        Idade: "40",
        Cidade: "Salvador",
        Profissao: "Contador",
    },
    {
        Nome: "Thiago",
        Idade: "54",
        Cidade: "Curitiba",
        Profissao: "Advogado",
    },
    { Nome: "Carla", Idade: "43", Cidade: "Recife", Profissao: "Contador" },
    { Nome: "Nina", Idade: "49", Cidade: "Belém", Profissao: "Biólogo" },
    {
        Nome: "Nina",
        Idade: "38",
        Cidade: "Fortaleza",
        Profissao: "Psicólogo",
    },
    {
        Nome: "Diego",
        Idade: "57",
        Cidade: "Belo Horizonte",
        Profissao: "Professora",
    },
    {
        Nome: "Diego",
        Idade: "32",
        Cidade: "Salvador",
        Profissao: "Analista",
    },
    {
        Nome: "Sofia",
        Idade: "54",
        Cidade: "Belo Horizonte",
        Profissao: "Cozinheiro",
    },
    {
        Nome: "Bruno",
        Idade: "25",
        Cidade: "Salvador",
        Profissao: "Estudante",
    },
    {
        Nome: "Felipe",
        Idade: "24",
        Cidade: "Rio de Janeiro",
        Profissao: "Estudante",
    },
    {
        Nome: "Vanessa",
        Idade: "38",
        Cidade: "Curitiba",
        Profissao: "Designer",
    },
    {
        Nome: "Vanessa",
        Idade: "33",
        Cidade: "Porto Alegre",
        Profissao: "Estudante",
    },
    {
        Nome: "Lucas",
        Idade: "46",
        Cidade: "Curitiba",
        Profissao: "Contador",
    },
    {
        Nome: "Hugo",
        Idade: "47",
        Cidade: "Curitiba",
        Profissao: "Psicólogo",
    },
    {
        Nome: "Paula",
        Idade: "26",
        Cidade: "Fortaleza",
        Profissao: "Professora",
    },
    {
        Nome: "Rafael",
        Idade: "26",
        Cidade: "Belo Horizonte",
        Profissao: "Vendedor",
    },
    {
        Nome: "Lucas",
        Idade: "50",
        Cidade: "Fortaleza",
        Profissao: "Gerente",
    },
    {
        Nome: "Hugo",
        Idade: "44",
        Cidade: "Rio de Janeiro",
        Profissao: "Engenheira",
    },
    {
        Nome: "Otávio",
        Idade: "43",
        Cidade: "Belém",
        Profissao: "Professora",
    },
    {
        Nome: "Otávio",
        Idade: "44",
        Cidade: "São Paulo",
        Profissao: "Vendedor",
    },
    {
        Nome: "Diego",
        Idade: "36",
        Cidade: "Salvador",
        Profissao: "Designer",
    },
    {
        Nome: "Bruno",
        Idade: "42",
        Cidade: "Recife",
        Profissao: "Estudante",
    },
    {
        Nome: "Marcos",
        Idade: "56",
        Cidade: "Recife",
        Profissao: "Enfermeira",
    },
    {
        Nome: "Lucas",
        Idade: "59",
        Cidade: "São Paulo",
        Profissao: "Jornalista",
    },
];

//appendFile();
run();

//filter();
