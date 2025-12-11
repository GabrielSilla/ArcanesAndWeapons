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
        new CardModel(1, "Adaga Básica", '/assets/cards/itens/adaga-basica.png', true, 1),
        new CardModel(2, "Adaga do Adepto", '/assets/cards/itens/adaga-adepto.png', true, 2),
        new CardModel(3, "Adaga Avançada", '/assets/cards/itens/adaga-avancada.png', true, 3),
        new CardModel(4, "Cajado Básico", '/assets/cards/itens/cajado-basico.png', true, 1),
        new CardModel(5, "Cajado do Adepto", '/assets/cards/itens/cajado-adepto.png', true, 2),
        new CardModel(6, "Cajado Avançado", '/assets/cards/itens/cajado-avancado.png', true, 3),
        new CardModel(7, "Espada Básica", '/assets/cards/itens/espada-basica.png', true, 1),
        new CardModel(8, "Espada do Adepto", '/assets/cards/itens/espada-adepto.png', true, 2),
        new CardModel(9, "Espada Avançada", '/assets/cards/itens/espada-avancada.png', true, 3),
        new CardModel(10, "Tomo Básico", '/assets/cards/itens/tomo-basico.png', true, 1),
        new CardModel(11, "Tomo do Adepto", '/assets/cards/itens/tomo-adepto.png', true, 2),
        new CardModel(12, "Tomo Avançado", '/assets/cards/itens/tomo-avancado.png', true, 3),
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
        new CardModel(1, "Pedra Arcana", '/assets/cards/magic/arcane-stone.png', false, 0),
        new CardModel(2, "Pedra da Morte", '/assets/cards/magic/death-stone.png', false, 0),
        new CardModel(3, "Pedra Elemental", '/assets/cards/magic/elemental-stone.png', false, 0),
        new CardModel(4, "Pedra Sagrada", '/assets/cards/magic/holy-stone.png', false, 0),
    ];

    public magic = [
        new MagicCardModel(1, "Barreira de Distorção", 'assets/cards/magic/arcane/barreira-distorcao.png', 2, 0, 0, 0),
        new MagicCardModel(2, "Campo Gravitacional", 'assets/cards/magic/arcane/campo-gravitacional.png', 4, 0, 0, 0),
        new MagicCardModel(3, "Canhão de Energia", 'assets/cards/magic/arcane/barreira-distorcao.png', 2, 0, 1, 0),
        new MagicCardModel(4, "Dissipar Efeitos", 'assets/cards/magic/arcane/dissipar-efeitos.png', 2, 0, 0, 0),
        new MagicCardModel(5, "Espada Arcana", 'assets/cards/magic/arcane/espada-arcana.png', 3, 0, 0, 0),
        new MagicCardModel(6, "Espelho Mágico", 'assets/cards/magic/arcane/espelho-magico.png', 4, 0, 0, 0),
        new MagicCardModel(7, "Lacaio Ilusório", 'assets/cards/magic/arcane/lacaio-ilusorio.png', 3, 0, 0, 0),
        new MagicCardModel(8, "Seta Arcana", 'assets/cards/magic/arcane/seta-arcana.png', 2, 0, 0, 0),
        new MagicCardModel(9, "Singularidade", 'assets/cards/magic/arcane/singularidade.png', 5, 0, 0, 0),
        new MagicCardModel(10, "Transmutação", 'assets/cards/magic/arcane/transmutacao.png', 3, 0, 0, 0),
    ]
}