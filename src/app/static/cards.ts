import { CardModel } from "./card-model"
import { MagicCardModel } from "./magic-card-model";

export class Cards {
    public classes = [
        new CardModel(1, "Curandeiro", '/assets/cards/classes/curandeiro-min.png', false, 0),
        new CardModel(2, "Guerreiro", '/assets/cards/classes/guerreiro-min.png', false, 0),
        new CardModel(3, "Ladino", '/assets/cards/classes/ladino-min.png', false, 0),
        new CardModel(4, "Mago", '/assets/cards/classes/mago-min.png', false, 0)
    ];

    public races = [
        new CardModel(1, "Anão", '/assets/cards/races/dwarf.png', false, 0),
        new CardModel(2, "Elfo", '/assets/cards/races/elf.png', false, 0),
        new CardModel(3, "Humano", '/assets/cards/races/human.png', false, 0),
        new CardModel(4, "Orc", '/assets/cards/races/orc.png', false, 0)
    ];

    public vd = [
        new CardModel(1, "Sangue Ácido", '/assets/cards/vd/acid-blood.png', false, 0),
        new CardModel(2, "Amigo da Fauna", '/assets/cards/vd/animals-friend.png', false, 0),
        new CardModel(3, "Aracnofobia", '/assets/cards/vd/aracnofobia.png', false, 0),
        new CardModel(4, "Abençoado", '/assets/cards/vd/blessed.png', false, 0),
        new CardModel(5, "Reflexos de Gato", '/assets/cards/vd/cat-reflexes.png', false, 0),
        new CardModel(6, "Cleptomaniaco", '/assets/cards/vd/cleptomaniac.png', false, 0),
        new CardModel(7, "Sorte Dupla", '/assets/cards/vd/double-luck.png', false, 0),
        new CardModel(8, "Aura Amedrontadora", '/assets/cards/vd/fearsome-aura.png', false, 0),
        new CardModel(9, "Metamorfose Parcial", '/assets/cards/vd/half-metamorfosis.png', false, 0),
        new CardModel(10, "Dom de Cura", '/assets/cards/vd/healing-gift.png', false, 0),
        new CardModel(11, "Vício em Alquimia", '/assets/cards/vd/mad-alchemist.png', false, 0),
        new CardModel(12, "Medo do Escuro", '/assets/cards/vd/fear-of-dark.png', false, 0),
        new CardModel(13, "Visão Noturna", '/assets/cards/vd/night-vision.png', false, 0),
        new CardModel(14, "Vampirismo", '/assets/cards/vd/vampirism.png', false, 0),
        new CardModel(15, "Grito de Guerra", '/assets/cards/vd/war-scream.png', false, 0),
        new CardModel(16, "Perito em Armas", '/assets/cards/vd/weapon-master.png', false, 0),
    ];

    public itens = [
        new CardModel(1, "Adaga Básica", '/assets/cards/itens/adaga-basica.png', true, 1, 3),
        new CardModel(2, "Adaga do Adepto", '/assets/cards/itens/adaga-adepto.png', true, 2, 3),
        new CardModel(3, "Adaga Avançada", '/assets/cards/itens/adaga-avancada.png', true, 3, 3),
        new CardModel(4, "Cajado Básico", '/assets/cards/itens/cajado-basico.png', true, 1, 1),
        new CardModel(5, "Cajado do Adepto", '/assets/cards/itens/cajado-adepto.png', true, 2, 1),
        new CardModel(6, "Cajado Avançado", '/assets/cards/itens/cajado-avancado.png', true, 3, 1),
        new CardModel(7, "Espada Básica", '/assets/cards/itens/espada-basica.png', true, 1, 2),
        new CardModel(8, "Espada do Adepto", '/assets/cards/itens/espada-adepto.png', true, 2, 2),
        new CardModel(9, "Espada Avançada", '/assets/cards/itens/espada-avancada.png', true, 3, 2),
        new CardModel(10, "Tomo Básico", '/assets/cards/itens/tomo-basico.png', true, 1, 4),
        new CardModel(11, "Tomo do Adepto", '/assets/cards/itens/tomo-adepto.png', true, 2, 4),
        new CardModel(12, "Tomo Avançado", '/assets/cards/itens/tomo-avancado.png', true, 3, 4),
        new CardModel(13, "Bomba de Fumaça", '/assets/cards/itens/bomba-fumaca.png', false, 0),
        new CardModel(14, "Coração de Dragão", '/assets/cards/itens/coracao-dragao.png', false, 0),
        new CardModel(15, "Óleo de Lentidão", '/assets/cards/itens/oleo-lentidao.png', false, 0),
        new CardModel(16, "Pergaminho da Morte", '/assets/cards/itens/pergaminho-morte.png', false, 0),
        new CardModel(17, "Pergaminho de Retorno", '/assets/cards/itens/pergaminho-retorno.png', false, 0),
        new CardModel(18, "Poção Explosiva", '/assets/cards/itens/pocao-explosiva.png', false, 0),
        new CardModel(19, "Poção de Força", '/assets/cards/itens/pocao-forca.png', false, 0),
        new CardModel(20, "Poção da Invisibilidade", '/assets/cards/itens/pocao-invisibilidade.png', false, 0),
        new CardModel(21, "Poção de Mana", '/assets/cards/itens/pocao-mana.png', false, 0),
        new CardModel(22, "Poção de Restauração", '/assets/cards/itens/pocao-pv.png', false, 0),
        new CardModel(23, "Poção de Resistência", '/assets/cards/itens/pocao-resistencia.png', false, 0),
        new CardModel(24, "Poção da Vida", '/assets/cards/itens/pocao-reviver.png', false, 0),
        new CardModel(25, "Veneno Maior", '/assets/cards/itens/veneno-maior.png', false, 0),
        new CardModel(26, "Veneno Menor", '/assets/cards/itens/veneno-menor.png', false, 0)
    ];

    public stones = [
        new CardModel(1, "Pedra Arcana", '/assets/cards/magic/arcane-stone.png', false, 0, 0, true),
        new CardModel(2, "Pedra da Morte", '/assets/cards/magic/death-stone.png', false, 0, 0, true),
        new CardModel(3, "Pedra Elemental", '/assets/cards/magic/elemental-stone.png', false, 0, 0, true),
        new CardModel(4, "Pedra Sagrada", '/assets/cards/magic/holy-stone.png', false, 0, 0 , true),
    ];

    public magic = [
        new MagicCardModel(1, "Barreira de Distorção", 'assets/cards/magic/arcane/barreira-distorcao.png', 2, 0, 0, 0),
        new MagicCardModel(2, "Campo Gravitacional", 'assets/cards/magic/arcane/campo-gravitacional.png', 4, 0, 0, 0),
        new MagicCardModel(3, "Canhão de Energia", 'assets/cards/magic/arcane/canhao-energia.png', 2, 0, 1, 0),
        new MagicCardModel(4, "Dissipar Efeitos", 'assets/cards/magic/arcane/dissipar-efeitos.png', 2, 0, 0, 0),
        new MagicCardModel(5, "Espada Arcana", 'assets/cards/magic/arcane/espada-arcana.png', 3, 0, 0, 0),
        new MagicCardModel(6, "Espelho Mágico", 'assets/cards/magic/arcane/espelho-magico.png', 4, 0, 0, 0),
        new MagicCardModel(7, "Lacaio Ilusório", 'assets/cards/magic/arcane/lacaio-ilusorio.png', 3, 0, 0, 0),
        new MagicCardModel(8, "Seta Arcana", 'assets/cards/magic/arcane/seta-arcana.png', 2, 0, 0, 0),
        new MagicCardModel(9, "Singularidade", 'assets/cards/magic/arcane/singularidade.png', 5, 0, 0, 0),
        new MagicCardModel(10, "Transmutação", 'assets/cards/magic/arcane/transmutacao.png', 3, 0, 0, 0),
        new MagicCardModel(11, "Barreira de Gelo", 'assets/cards/magic/elemental/barreira-de-gelo.png', 0, 0, 2, 0),
        new MagicCardModel(12, "Bola de Chama Negra", 'assets/cards/magic/elemental/bola-chama-negra.png', 0, 1, 2, 0),
        new MagicCardModel(13, "Bola de Fogo", 'assets/cards/magic/elemental/bola-de-fogo.png', 0, 0, 2, 0),
        new MagicCardModel(14, "Chama Negra Encarnada", 'assets/cards/magic/elemental/chama-negra-encarnada.png', 0, 2, 3, 0),
        new MagicCardModel(15, "Chuva de Meteoritos", 'assets/cards/magic/elemental/chuva-de-meteoritos.png', 1, 0, 1, 0),
        new MagicCardModel(16, "Geiser de Chamas Negras", 'assets/cards/magic/elemental/geiser-chamas-negras.png', 0, 2, 2, 0),
        new MagicCardModel(17, "Meteoro", 'assets/cards/magic/elemental/meteoro.png', 2, 0, 3, 0),
        new MagicCardModel(18, "Nevasca", 'assets/cards/magic/elemental/nevasca.png', 1, 0, 4, 0),
        new MagicCardModel(19, "Rajada de Vento", 'assets/cards/magic/elemental/rajada-vento.png', 0, 0, 1, 0),
        new MagicCardModel(20, "Relâmpago", 'assets/cards/magic/elemental/relampago.png', 0, 0, 2, 0),
        new MagicCardModel(21, "Sopro do Dragão", 'assets/cards/magic/elemental/sopro-do-dragao.png', 0, 0, 3, 0),
        new MagicCardModel(22, "Tempestade", 'assets/cards/magic/elemental/tempestade.png', 1, 0, 3, 0),
        new MagicCardModel(23, "Terremoto", 'assets/cards/magic/elemental/terremoto.png', 0, 0, 3, 0),
        new MagicCardModel(24, "Tormenta", 'assets/cards/magic/elemental/tormenta.png', 2, 0, 2, 0),
        new MagicCardModel(25, "Aliança de Cura", 'assets/cards/magic/holy/alianca-de-cura.png', 0, 0, 0, 4),
        new MagicCardModel(26, "Benção da Força", 'assets/cards/magic/holy/bencao-da-forca.png', 0, 0, 0, 2),
        new MagicCardModel(27, "Benção da Proteção", 'assets/cards/magic/holy/bencao-da-protecao.png', 0, 0, 0, 2),
        new MagicCardModel(28, "Julgamento", 'assets/cards/magic/holy/julgamento.png', 0, 0, 0, 5),
        new MagicCardModel(29, "Purificação", 'assets/cards/magic/holy/purificacao.png', 0, 0, 0, 2),
        new MagicCardModel(30, "Raio Solar", 'assets/cards/magic/holy/raio-solar.png', 0, 0, 0, 2),
        new MagicCardModel(31, "Renascimento", 'assets/cards/magic/holy/renascimento.png', 0, 0, 0, 5),
        new MagicCardModel(32, "Restauração", 'assets/cards/magic/holy/restauracao.png', 0, 0, 0, 1),
        new MagicCardModel(33, "Solo Sagrado", 'assets/cards/magic/holy/solo-sagrado.png', 0, 0, 0, 4),
        new MagicCardModel(34, "Benção do Urso", 'assets/cards/magic/nature/bencao-do-urso.png', 1, 0, 1, 1),
        new MagicCardModel(35, "Conjurar Aranha", 'assets/cards/magic/nature/conjurar-aranha.png', 2, 0, 1, 0),
        new MagicCardModel(36, "Conjurar Lobo", 'assets/cards/magic/nature/conjurar-lobo.png', 3, 0, 2, 0),
        new MagicCardModel(37, "Convocar Raízes", 'assets/cards/magic/nature/convocar-raizes.png', 0, 0, 1, 1),
        new MagicCardModel(38, "Forma de Urso", 'assets/cards/magic/nature/forma-de-urso.png', 1, 0, 2, 2),
        new MagicCardModel(39, "Armadilha de Sangue", 'assets/cards/magic/necro/armadilha-sangue.png', 0, 4, 0, 0),
        new MagicCardModel(40, "Dardos de Sangue", 'assets/cards/magic/necro/dardos-sangue.png', 0, 4, 0, 0),
        new MagicCardModel(41, "Drenar Vida", 'assets/cards/magic/necro/drenar-vida.png', 0, 4, 0, 0),
        new MagicCardModel(42, "Invocar Esqueleto Maior", 'assets/cards/magic/necro/esqueleto-maior.png', 0, 4, 0, 0),
        new MagicCardModel(43, "Garras de Sangue", 'assets/cards/magic/necro/garras-de-sangue.png', 0, 1, 0, 0),
        new MagicCardModel(44, "Invocar Esqueleto", 'assets/cards/magic/necro/invocar-esqueleto.png', 0, 2, 0, 0),
        new MagicCardModel(45, "Lança de Sangue", 'assets/cards/magic/necro/lanca-de-sangue.png', 0, 3, 0, 0),
        new MagicCardModel(46, "Mão Zumbi", 'assets/cards/magic/necro/mao-zumbi.png', 0, 1, 0, 0),
        new MagicCardModel(47, "Marca da Morte", 'assets/cards/magic/necro/marca-da-morte.png', 0, 2, 0, 0),
        new MagicCardModel(48, "Praga", 'assets/cards/magic/necro/praga.png', 0, 3, 0, 0),
        new MagicCardModel(49, "Remover Olhos", 'assets/cards/magic/necro/remover-olhos.png', 0, 2, 0, 0),
        new MagicCardModel(50, "Toque Sombrio", 'assets/cards/magic/necro/toque-sombrio.png', 0, 1, 0, 0),
        new MagicCardModel(51, "Transfusão Forçada", 'assets/cards/magic/necro/transfusao-forcada.png', 0, 2, 0, 0)
    ]
}