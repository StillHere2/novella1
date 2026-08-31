import { DayStory } from '../types/game';

// Helper to count words in Russian/English for strict danger validation
export function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export const STORY_DAYS: DayStory[] = [
  // =========================================================================
  // ДЕНЬ 1: Непрошеная иконка, скепсис Алисы, проверка физики и ночной стелс
  // Хронометраж прохождения: ~20 минут реального интерактивного времени
  // =========================================================================
  {
    dayNumber: 1,
    title: "День 1: Черный экран и непрошеная иконка",
    subtitle: "23:47 — Комната Алисы / 02:17 — Одинокий фонарь в серой мгле",
    initialPerspective: "girl",
    startingStepId: "d1_system_init",
    steps: {
      // === АКТ 1: СЕТЕВОЕ ВТОРЖЕНИЕ И СКЕПСИС АЛИСЫ ===
      d1_system_init: {
        id: "d1_system_init",
        sender: "system",
        text: "[Инициализация Null_Echo... Прямой канал открыт]",
        activePerspective: "girl",
        thoughts: [
          {
            id: "t_d1_1",
            text: "Что за чертовщина? Какое-то приложение само развернулось посреди ночи... Очередной кривой троян или чья-то глупая шутка? Хочется послать автора подальше... Но почему сердце так забилось? Словно я всю жизнь ждала, что в моей серой комнате случится что-то невозможное.",
            character: "girl",
            category: "reflection"
          }
        ],
        nextStepId: "d1_boy_first_ping"
      },

      d1_boy_first_ping: {
        id: "d1_boy_first_ping",
        sender: "boy",
        text: "Эй?.. Экран замигал. Кто-то живой?",
        activePerspective: "girl",
        delayMs: 1500,
        thoughts: [
          {
            id: "t_d1_alisa_irritation",
            text: "«Кто-то живой?»... Серьезно? Звучит как дешевая завязка квеста от однокурсников. Надо бы ответить пожестче и выключить телефон... Но пальцы замерли над экраном. Черт возьми, неужели мне так отчаянно хочется, чтобы это было правдой?",
            character: "girl",
            category: "reflection"
          }
        ],
        nextStepId: "d1_boy_burst1_help"
      },

      d1_boy_burst1_help: {
        id: "d1_boy_burst1_help",
        sender: "boy",
        text: "Пожалуйста, не уходи, я не могу никому написать, я не понимаю где я",
        activePerspective: "girl",
        delayMs: 5000,
        thoughts: [
          {
            id: "t_d1_help_reaction",
            text: "«Не понимаю, где я»... Разыгрывает драму как по нотам. Сейчас попросит денег или скинет фишинговую ссылку. Нужно высмеять его и заблокировать... Но если это не розыгрыш? Если где-то там правда есть живой человек, которому нужна помощь?",
            character: "girl",
            category: "reflection"
          }
        ],
        nextStepId: "d1_girl_choice_interrogate"
      },

      d1_girl_choice_interrogate: {
        id: "d1_girl_choice_interrogate",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        thoughts: [
          {
            id: "t_d1_interrogate",
            text: "Устрою ему допрос с пристрастием. Посмотрим, как посыплется этот «спектакль». Хотя... если это окажется правдой, я готова вцепиться в этот шанс обеими руками.",
            character: "girl",
            category: "clue"
          }
        ],
        choices: [
          {
            id: "c1_ask_emergency",
            label: "«Если ты упал и ранен — почему не звонишь в 112 или родителям?»",
            messageText: "Если ты упал и ранен — почему не звонишь в 112 или родителям? Набери экстренный номер.",
            statImpact: { courage: 7 },
            nextStepId: "d1_boy_resp_emergency_112"
          },
          {
            id: "c1_ask_location",
            label: "«Назови адрес или улицу. Я посмотрю по картам и вызову скорую».",
            messageText: "Назови точный адрес: улицу, номер дома, какой-то ориентир? Я открою карты и вызову тебе скорую со своего телефона.",
            statImpact: { courage: 6, affection: 5 },
            nextStepId: "d1_boy_resp_location"
          },
          {
            id: "c1_skeptical_prank",
            label: "«Кто ты вообще? Если это чей-то глупый розыгрыш — мне не смешно».",
            messageText: "Кто ты вообще такой? Если это очередной ночной розыгрыш однокурсников — мне совершенно не смешно.",
            statImpact: { courage: 8 },
            nextStepId: "d1_boy_resp_prank"
          }
        ]
      },

      // --- КОНТЕКСТНЫЙ ОТВЕТ 1: НА ВОПРОС ПРО 112 И РОДИТЕЛЕЙ ---
      d1_boy_resp_emergency_112: {
        id: "d1_boy_resp_emergency_112",
        sender: "boy",
        text: "Я пробовал звонить... В 112 только мертвый треск, а домашний номер сразу сбрасывает.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d1_girl_choice_sarcasm"
      },

      // --- КОНТЕКСТНЫЙ ОТВЕТ 2: НА ПРЕДЛОЖЕНИЕ ПОСМОТРЕТЬ КАРТЫ И ВЫЗВАТЬ СКОРУЮ ---
      d1_boy_resp_location: {
        id: "d1_boy_resp_location",
        sender: "boy",
        text: "Я подошел к углу дома, но на синей табличке пусто — просто белый прямоугольник без букв.",
        activePerspective: "girl",
        delayMs: 2300,
        nextStepId: "d1_girl_choice_sarcasm"
      },

      // --- КОНТЕКСТНЫЙ ОТВЕТ 3: НА ПОДОЗРЕНИЯ В РОЗЫГРЫШЕ ---
      d1_boy_resp_prank: {
        id: "d1_boy_resp_prank",
        sender: "boy",
        text: "Это не розыгрыш... Мне самому дико страшно. Я не знаю твоих однокурсников и не помню, как тут оказался.",
        activePerspective: "girl",
        delayMs: 2300,
        nextStepId: "d1_girl_choice_sarcasm"
      },

      // Саркастическая реакция Алисы на ночные небылицы
      d1_girl_choice_sarcasm: {
        id: "d1_girl_choice_sarcasm",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        thoughts: [
          {
            id: "t_d1_sarcasm_note",
            text: "«Пустые таблички», «мертвый треск»... Складно заливает, прямо сценарий для фестиваля короткометражек. Надо ответить максимально язвительно, чтобы сбить спесь... Хотя черт возьми, как же хочется верить, что мир шире моей душной комнаты.",
            character: "girl",
            category: "reflection"
          }
        ],
        choices: [
          {
            id: "c1_sarcasm_horror",
            label: "«Потрясающий сценарий для дешевого хоррора. Сами сочиняли?»",
            messageText: "Потрясающий сценарий для дешевого хоррора. Вы там всей общагой сочиняли?",
            statImpact: { courage: 7 },
            nextStepId: "d1_boy_resp_sarcasm_horror"
          },
          {
            id: "c1_sarcasm_drama",
            label: "«Мертвый треск и пустые таблички? Да ты прирожденный актер драматического театра».",
            messageText: "Мертвый треск и пустые таблички? Да ты прирожденный актер драматического театра. Скажи еще, что за тобой тени из углов следят.",
            statImpact: { courage: 8 },
            nextStepId: "d1_boy_resp_sarcasm_drama"
          },
          {
            id: "c1_sarcasm_aliens",
            label: "«Очень убедительно. А белые единороги или пришельцы мимо еще не пролетали?»",
            messageText: "Очень убедительно. А белые единороги или летающие тарелки мимо тебя еще не пролетали?",
            statImpact: { courage: 6, affection: 4 },
            nextStepId: "d1_boy_resp_sarcasm_aliens"
          }
        ]
      },

      // Реакции Марка на сарказм Алисы
      d1_boy_resp_sarcasm_horror: {
        id: "d1_boy_resp_sarcasm_horror",
        sender: "boy",
        text: "Думаешь, я развлекаюсь?! У меня руки трясутся не от смеха, а от дикого холода!",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d1_boy_sarcasm_followup"
      },

      d1_boy_resp_sarcasm_drama: {
        id: "d1_boy_resp_sarcasm_drama",
        sender: "boy",
        text: "Да какая к черту драма?! Я не актер, мне просто страшно до одурения!",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d1_boy_sarcasm_followup"
      },

      d1_boy_resp_sarcasm_aliens: {
        id: "d1_boy_resp_sarcasm_aliens",
        sender: "boy",
        text: "Смейся сколько влезет, но я не псих. Мне реально некуда бежать.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d1_boy_sarcasm_followup"
      },

      d1_boy_sarcasm_followup: {
        id: "d1_boy_sarcasm_followup",
        sender: "boy",
        text: "Тут даже ветра нет. Словно весь мир вымер или застыл на вечной паузе.",
        activePerspective: "girl",
        delayMs: 2300,
        thoughts: [
          {
            id: "t_d1_sarcasm_doubt",
            text: "Он огрызается так искренне... В шутках так не паникуют. Разум кричит: «тебя разводят, не будь наивной дурой!». Но сердце отчаянно цепляется за эту безумную надежду.",
            character: "girl",
            category: "reflection"
          }
        ],
        nextStepId: "d1_girl_choice_test_physics"
      },

      // === АКТ 2: ЭМПИРИЧЕСКАЯ ПРОВЕРКА ФИЗИКИ МИРА ===
      d1_girl_choice_test_physics: {
        id: "d1_girl_choice_test_physics",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_test_sky_clock",
            label: "«Проведи тест: посмотри на небо и на секундомер. Что со временем?»",
            messageText: "Проведи тест: посмотри на небо — есть ли звезды или луна? И какое точное системное время на твоем экране?",
            statImpact: { courage: 7 },
            nextStepId: "d1_boy_resp_sky_clock"
          },
          {
            id: "c1_test_acoustic",
            label: "«Хлопни в ладоши и послушай эхо от стен домов».",
            messageText: "Хлопни громко в ладоши перед домом. Сколько секунд длится отражение звука от стен?",
            statImpact: { courage: 6, affection: 5 },
            nextStepId: "d1_boy_resp_acoustic"
          },
          {
            id: "c1_test_pockets",
            label: "«Ощупай свои карманы. Должны быть ключи или документы с именем».",
            messageText: "Проверь внутренние карманы куртки. Ключи, проездной, паспорт, водительские права? Хоть что-то с именем? Как тебя зовут?",
            statImpact: { courage: 5, affection: 6 },
            nextStepId: "d1_boy_resp_pockets"
          }
        ]
      },

      // Контекстный ответ на небо и часы
      d1_boy_resp_sky_clock: {
        id: "d1_boy_resp_sky_clock",
        sender: "boy",
        text: "Посмотрел наверх... Неба нет, только сплошной низкий серый потолок без звезд и луны.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d1_boy_clock_sub"
      },

      d1_boy_clock_sub: {
        id: "d1_boy_clock_sub",
        sender: "boy",
        text: "А на часах ровно 02:17. Секундная стрелка замерла и не двигается.",
        activePerspective: "girl",
        delayMs: 2100,
        thoughts: [
          {
            id: "t_d1_clock_frozen",
            text: "Застывшее время, отсутствие звезд... Красивая сказка. Но если это правда аномальный карман? Если между нами сквозь километры и время протянулся настоящий провод?",
            character: "girl",
            category: "reflection"
          }
        ],
        nextStepId: "d1_boy_pockets_after"
      },

      // Контекстный ответ на акустику
      d1_boy_resp_acoustic: {
        id: "d1_boy_resp_acoustic",
        sender: "boy",
        text: "Хлопнул изо всех сил перед девятиэтажкой... Звук оборвался мгновенно, будто в вате. Никакого эха.",
        activePerspective: "girl",
        delayMs: 2300,
        thoughts: [
          {
            id: "t_d1_sound_absorb",
            text: "Нулевая реверберация... Либо он виртуозно врет по заранее написанному тексту, либо законы физики там действительно мертвы. И если это так — я не имею права его бросить.",
            character: "girl",
            category: "clue"
          }
        ],
        nextStepId: "d1_boy_pockets_after"
      },

      // Контекстный ответ на проверку карманов
      d1_boy_resp_pockets: {
        id: "d1_boy_resp_pockets",
        sender: "boy",
        text: "Ничего нет.",
        activePerspective: "girl",
        delayMs: 1800,
        nextStepId: "d1_boy_pockets_after"
      },

      d1_boy_pockets_after: {
        id: "d1_boy_pockets_after",
        sender: "boy",
        text: "Нащупал только тяжелый ключ с выбитым числом «42» и альпинистский карабин.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d1_boy_name_answer"
      },

      d1_boy_name_answer: {
        id: "d1_boy_name_answer",
        sender: "boy",
        text: "В памяти всплывает имя... Марк. Больше ни одной детали из прошлого.",
        activePerspective: "girl",
        delayMs: 2200,
        thoughts: [
          {
            id: "t_d1_mark_intro",
            text: "Марк... Звучит слишком по-настоящему для сетевого троллинга. Я всё еще ищу подвох и готовлю едкие реплики, но внутри уже всё горит от желания поверить ему.",
            character: "girl",
            category: "clue"
          }
        ],
        nextStepId: "d1_girl_choice_name_give"
      },

      d1_girl_choice_name_give: {
        id: "d1_girl_choice_name_give",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_give_alisa_name",
            label: "«Меня зовут Алиса. Пока не делай резких движений».",
            messageText: "Меня зовут Алиса. Если у тебя контузия или шок — не делай резких движений. Осмотрись и скажи, что видишь на горизонте.",
            statImpact: { affection: 6, courage: 5 },
            nextStepId: "d1_boy_resp_name_alisa"
          },
          {
            id: "c1_strict_caution",
            label: "«Я не стану называть свое имя. Держи дистанцию и докладывай обстановку».",
            messageText: "Я не буду раскрывать личные данные. Ты можешь быть кем угодно. Докладывай только факты: что находится на проспекте?",
            statImpact: { courage: 8 },
            nextStepId: "d1_boy_resp_name_strict"
          }
        ]
      },

      // Контекстный ответ на доверие и имя Алисы
      d1_boy_resp_name_alisa: {
        id: "d1_boy_resp_name_alisa",
        sender: "boy",
        text: "Алиса... Спасибо тебе. С тобой уже не так дико страшно.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d1_boy_survey_street"
      },

      // Контекстный ответ на холодную строгость Алисы
      d1_boy_resp_name_strict: {
        id: "d1_boy_resp_name_strict",
        sender: "boy",
        text: "Понимаю тебя... Я бы тоже не доверял незнакомцу посреди ночи.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d1_boy_survey_street"
      },

      // === АКТ 3: ИССЛЕДОВАНИЕ ПРОСПЕКТА И БРОШЕННЫЙ ТРАМВАЙ ===
      d1_boy_survey_street: {
        id: "d1_boy_survey_street",
        sender: "boy",
        text: "Впереди широкий проспект. На ржавых рельсах стоит старый трамвай.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d1_boy_tram_desc_1"
      },

      d1_boy_tram_desc_1: {
        id: "d1_boy_tram_desc_1",
        sender: "boy",
        text: "Один вагон. Двери перекошены, стекла в трещинах.",
        activePerspective: "girl",
        delayMs: 2200,
        thoughts: [
          {
            id: "t_d1_tram_model",
            text: "Линию с трамваями у нас закрыли годы назад. Либо это дотошный исторический пранк от людей из универа, либо... он застрял в нашем городе, только в его мертвом слепке.",
            character: "girl",
            category: "clue"
          }
        ],
        nextStepId: "d1_girl_choice_tram_search"
      },

      d1_girl_choice_tram_search: {
        id: "d1_girl_choice_tram_search",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_enter_tram",
            label: "«Зайди в салон трамвая. Там могут быть инструменты или карта маршрута».",
            messageText: "Осторожно загляни в салон. Проверь кабину водителя: там может быть план маршрута, фонарик или аптечка.",
            statImpact: { courage: 7, affection: 5 },
            nextStepId: "d1_boy_enter_tram_steps"
          },
          {
            id: "c1_bypass_tram",
            label: "«Не лезь внутрь! В замкнутом пространстве ты окажешься в ловушке».",
            messageText: "Не заходи в узкий салон! Если там что-то появится — у тебя не будет путей отхода. Обойди вагон по обочине.",
            statImpact: { courage: 6 },
            nextStepId: "d1_boy_bypass_tram_steps"
          }
        ]
      },

      d1_boy_enter_tram_steps: {
        id: "d1_boy_enter_tram_steps",
        sender: "boy",
        text: "Залез через разбитую заднюю створку. Внутри сыро.",
        activePerspective: "girl",
        delayMs: 2300,
        nextStepId: "d1_boy_tram_clues"
      },

      d1_boy_tram_clues: {
        id: "d1_boy_tram_clues",
        sender: "boy",
        text: "Нашел обгоревший билет. Дата — 14 ноября, два года назад.",
        activePerspective: "girl",
        delayMs: 2500,
        thoughts: [
          {
            id: "t_d1_tram_date",
            text: "14 ноября... Дата той аварии. Нет, шутники не могли продумать всё до таких мелочей. Кажется, этот кошмар реален. И эта невозможная связь — тоже.",
            character: "girl",
            category: "clue"
          }
        ],
        nextStepId: "d1_boy_tram_writing"
      },

      d1_boy_tram_writing: {
        id: "d1_boy_tram_writing",
        sender: "boy",
        text: "На стекле кабины надпись сажей: «02:17 — не смотри в отражения».",
        activePerspective: "girl",
        delayMs: 2600,
        nextStepId: "d1_boy_threat_begins"
      },

      d1_boy_bypass_tram_steps: {
        id: "d1_boy_bypass_tram_steps",
        sender: "boy",
        text: "Иду вдоль рельсов. Ржавчина на металле толщиной в палец.",
        activePerspective: "girl",
        delayMs: 2300,
        nextStepId: "d1_boy_threat_begins"
      },

      // === АКТ 4: ПЕРВЫЙ СМЕРТЕЛЬНЫЙ СТЕЛС (СТРОГО <= 5 СЛОВ ДЛЯ МАРКА) ===
      d1_boy_threat_begins: {
        id: "d1_boy_threat_begins",
        sender: "boy",
        text: "Стой. Сверху на крыше удар.", // 5 words
        activePerspective: "girl",
        delayMs: 1600,
        glitchEffect: true,
        thoughts: [
          {
            id: "t_d1_threat_alert",
            text: "Грохот по крыше... Всё внутри сжалось. Я так боялась оказаться обманутой дурочкой, а сейчас молюсь только об одном: чтобы он успел спрятаться!",
            character: "girl",
            category: "fear"
          }
        ],
        nextStepId: "d1_boy_threat_2"
      },

      d1_boy_threat_2: {
        id: "d1_boy_threat_2",
        sender: "boy",
        text: "Крыша вагона прогнулась вниз.", // 4 words
        activePerspective: "girl",
        delayMs: 1700,
        glitchEffect: true,
        nextStepId: "d1_boy_threat_3"
      },

      d1_boy_threat_3: {
        id: "d1_boy_threat_3",
        sender: "boy",
        text: "Слышу скрежет длинных когтей.", // 4 words
        activePerspective: "girl",
        delayMs: 1800,
        nextStepId: "d1_boy_threat_4"
      },

      d1_boy_threat_4: {
        id: "d1_boy_threat_4",
        sender: "boy",
        text: "Капает черная смола. Воняет.", // 4 words
        activePerspective: "girl",
        delayMs: 1600,
        thoughts: [
          {
            id: "t_d1_danger_reaction",
            text: "Смола, скрежет когтей... К черту сарказм и гордость, он должен выжить! Марк, только держись!",
            character: "girl",
            category: "fear"
          }
        ],
        nextStepId: "d1_girl_choice_emergency_guide"
      },

      d1_girl_choice_emergency_guide: {
        id: "d1_girl_choice_emergency_guide",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_stealth_crawl",
            label: "«Марк, сползай под нижние сиденья и не издавай ни звука!»",
            messageText: "Марк, плавно ложись на пол под сиденья! Прижми локти к ребрам, дыши через ткань куртки и не шевелись!",
            statImpact: { courage: 8, affection: 6 },
            nextStepId: "d1_boy_stealth_crawl_1"
          },
          {
            id: "c1_drop_through_window",
            label: "«Вываливайся через разбитое окно в траву с теневой стороны!»",
            messageText: "Вылезай через нижний проем разбитого окна в траву с противоположной стороны! Бесшумно скатись по насыпи!",
            statImpact: { courage: 7, affection: 5 },
            nextStepId: "d1_boy_stealth_window_1"
          }
        ]
      },

      // --- ВЕТКА 1: ПОД СИДЕНЬЯМИ (СТРОГО <= 5 СЛОВ) ---
      d1_boy_stealth_crawl_1: {
        id: "d1_boy_stealth_crawl_1",
        sender: "boy",
        text: "Лег на пол. Замер.", // 4 words
        activePerspective: "girl",
        delayMs: 1500,
        nextStepId: "d1_boy_stealth_crawl_2"
      },

      d1_boy_stealth_crawl_2: {
        id: "d1_boy_stealth_crawl_2",
        sender: "boy",
        text: "Смола капает рядом. Шипит.", // 4 words
        activePerspective: "girl",
        delayMs: 1700,
        glitchEffect: true,
        nextStepId: "d1_boy_stealth_crawl_3"
      },

      d1_boy_stealth_crawl_3: {
        id: "d1_boy_stealth_crawl_3",
        sender: "boy",
        text: "Оно спрыгнуло на асфальт.", // 4 words
        activePerspective: "girl",
        delayMs: 1800,
        nextStepId: "d1_boy_stealth_crawl_4"
      },

      d1_boy_stealth_crawl_4: {
        id: "d1_boy_stealth_crawl_4",
        sender: "boy",
        text: "Огромная масса без глаз.", // 4 words
        activePerspective: "girl",
        delayMs: 1800,
        nextStepId: "d1_boy_chase_trigger"
      },

      // --- ВЕТКА 2: ЧЕРЕЗ ОКНО (СТРОГО <= 5 СЛОВ) ---
      d1_boy_stealth_window_1: {
        id: "d1_boy_stealth_window_1",
        sender: "boy",
        text: "Вывалился в траву. Тихо.", // 4 words
        activePerspective: "girl",
        delayMs: 1500,
        nextStepId: "d1_boy_stealth_window_2"
      },

      d1_boy_stealth_window_2: {
        id: "d1_boy_stealth_window_2",
        sender: "boy",
        text: "Пополз за бетонный бордюр.", // 4 words
        activePerspective: "girl",
        delayMs: 1700,
        nextStepId: "d1_boy_stealth_window_3"
      },

      d1_boy_stealth_window_3: {
        id: "d1_boy_stealth_window_3",
        sender: "boy",
        text: "Оно проломило крышу вагона.", // 4 words
        activePerspective: "girl",
        delayMs: 1800,
        glitchEffect: true,
        nextStepId: "d1_boy_chase_trigger"
      },

      // === АКТ 5: ПОГОНЯ ПО ДВОРАМ И ПРОРЫВ В БОМБОУБЕЖИЩЕ (СТРОГО <= 5 СЛОВ) ===
      d1_boy_chase_trigger: {
        id: "d1_boy_chase_trigger",
        sender: "boy",
        text: "Оно почуяло. Поворачивает голову.", // 4 words
        activePerspective: "girl",
        delayMs: 1600,
        glitchEffect: true,
        thoughts: [
          {
            id: "t_d1_chase_alarm",
            text: "Оно видит его! Если это сон — разбудите меня, если реальность — Марк, беги изо всех сил!",
            character: "girl",
            category: "fear"
          }
        ],
        nextStepId: "d1_girl_choice_chase_direction"
      },

      d1_girl_choice_chase_direction: {
        id: "d1_girl_choice_chase_direction",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_run_alley_vault",
            label: "«Марк, беги в арку панельки слева! Там должен быть спуск в подвал!»",
            messageText: "Марк, срывайся и беги в темную арку слева! Там типичная советская застройка — во дворе обязательно есть наклонный вход в бомбоубежище!",
            statImpact: { courage: 9, affection: 6 },
            nextStepId: "d1_boy_chase_run_1"
          },
          {
            id: "c1_zigzag_courtyard",
            label: "«Петляй зигзагом между трансформаторными будками!»",
            messageText: "Не беги по прямой! Петляй между бетонными гаражами и трансформаторной будкой, срезай углы!",
            statImpact: { courage: 8, affection: 5 },
            nextStepId: "d1_boy_chase_run_1"
          }
        ]
      },

      d1_boy_chase_run_1: {
        id: "d1_boy_chase_run_1",
        sender: "boy",
        text: "Бегу изо всех сил.", // 4 words
        activePerspective: "girl",
        delayMs: 1400,
        nextStepId: "d1_boy_chase_run_2"
      },

      d1_boy_chase_run_2: {
        id: "d1_boy_chase_run_2",
        sender: "boy",
        text: "Сзади вой. Земля дрожит.", // 4 words
        activePerspective: "girl",
        delayMs: 1500,
        glitchEffect: true,
        nextStepId: "d1_boy_chase_run_3"
      },

      d1_boy_chase_run_3: {
        id: "d1_boy_chase_run_3",
        sender: "boy",
        text: "Впереди железная гермодверь убежища.", // 4 words
        activePerspective: "girl",
        delayMs: 1600,
        nextStepId: "d1_boy_chase_run_4"
      },

      d1_boy_chase_run_4: {
        id: "d1_boy_chase_run_4",
        sender: "boy",
        text: "Рванул штурвал. Влетел внутрь.", // 4 words
        activePerspective: "girl",
        delayMs: 1500,
        nextStepId: "d1_boy_chase_run_5"
      },

      d1_boy_chase_run_5: {
        id: "d1_boy_chase_run_5",
        sender: "boy",
        text: "Захлопнул засов. Удар снаружи!", // 4 words
        activePerspective: "girl",
        delayMs: 1700,
        glitchEffect: true,
        thoughts: [
          {
            id: "t_d1_vault_impact",
            text: "Удар в сталь... Пожалуйста, выдержи. Я не могу потерять его прямо сейчас, когда наконец нашла что-то настоящее.",
            character: "girl",
            category: "fear"
          }
        ],
        nextStepId: "d1_boy_chase_run_6"
      },

      d1_boy_chase_run_6: {
        id: "d1_boy_chase_run_6",
        sender: "boy",
        text: "Сталь гудит. Но держит.", // 4 words
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d1_boy_chase_run_7"
      },

      d1_boy_chase_run_7: {
        id: "d1_boy_chase_run_7",
        sender: "boy",
        text: "Шаги удаляются. Я спасся.", // 4 words
        activePerspective: "girl",
        delayMs: 2300,
        nextStepId: "d1_boy_vault_safe"
      },

      // === АКТ 6: УБЕЖИЩЕ, ПЕРЕВЯЗКА И НОЧНОЕ ПЕРЕМИРИЕ ===
      d1_boy_vault_safe: {
        id: "d1_boy_vault_safe",
        sender: "boy",
        text: "Сполз по стене на бетонный пол. Сердце колотится в висках.",
        activePerspective: "girl",
        delayMs: 2600,
        thoughts: [
          {
            id: "t_d1_safe_sigh",
            text: "Засов выдержал. У меня трясутся руки... Весь вечер я язвила и пряталась за маской циника, боясь поверить. Но это реально. Он реален. И я не отпущу эту нить.",
            character: "girl",
            category: "hope"
          }
        ],
        nextStepId: "d1_boy_first_aid_report"
      },

      d1_boy_first_aid_report: {
        id: "d1_boy_first_aid_report",
        sender: "boy",
        text: "Нашел в шкафу старый фонарь с динамо-машинкой и моток сухой марли.",
        activePerspective: "girl",
        delayMs: 2700,
        nextStepId: "d1_boy_wound_bind"
      },

      d1_boy_wound_bind: {
        id: "d1_boy_wound_bind",
        sender: "boy",
        text: "Перевязал ссадины на ладонях. Здесь пахнет сухой известью и железом.",
        activePerspective: "girl",
        delayMs: 2500,
        nextStepId: "d1_girl_choice_vulnerability"
      },

      d1_girl_choice_vulnerability: {
        id: "d1_girl_choice_vulnerability",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        thoughts: [
          {
            id: "t_d1_vulnerability_girl",
            text: "После травли в универе я поклялась никого не подпускать. Защищалась сарказмом и колючками. А сейчас смотрю на мигающий курсор и понимаю: я больше не одна в этой темноте.",
            character: "girl",
            category: "trauma"
          }
        ],
        choices: [
          {
            id: "c1_confess_isolation",
            label: "«Прости, что сначала грубила. Я никому не доверяю после травли в универе».",
            messageText: "Прости, что сначала общалась так агрессивно. В универе надо мной часто издеваются, и я привыкла защищаться нападением. Спасибо, что выжил.",
            statImpact: { affection: 9, dependence: 6, courage: 6 },
            nextStepId: "d1_boy_resp_confess_1"
          },
          {
            id: "c1_keep_analytic_mask",
            label: "«Ты действовал по инструкции. Пока мы на связи — твои шансы выжить растут».",
            messageText: "Ты четко выполнил все команды. Пока между нами держится этот сокет — я продолжу анализировать твои данные и строить маршруты.",
            statImpact: { courage: 8, affection: 6 },
            nextStepId: "d1_boy_resp_analytic_1"
          }
        ]
      },

      // Контекстный ответ на признание Алисы об издевках и защите
      d1_boy_resp_confess_1: {
        id: "d1_boy_resp_confess_1",
        sender: "boy",
        text: "Алиса... Тебе не за что извиняться. Я понимаю, каково это — когда приходится защищаться от всех.",
        activePerspective: "girl",
        delayMs: 2600,
        nextStepId: "d1_boy_resp_confess_2"
      },

      d1_boy_resp_confess_2: {
        id: "d1_boy_resp_confess_2",
        sender: "boy",
        text: "Ты спасла мне жизнь. Я никогда не забуду, что ты не бросила меня в этой темноте.",
        activePerspective: "girl",
        delayMs: 2500,
        nextStepId: "d1_girl_choice_night_protocol"
      },

      // Контекстный ответ на сдержанную аналитическую позицию Алисы
      d1_boy_resp_analytic_1: {
        id: "d1_boy_resp_analytic_1",
        sender: "boy",
        text: "Спасибо тебе за хладнокровие. Если бы не твои четкие расчеты — я бы погиб на тех рельсах.",
        activePerspective: "girl",
        delayMs: 2600,
        nextStepId: "d1_boy_resp_analytic_2"
      },

      d1_boy_resp_analytic_2: {
        id: "d1_boy_resp_analytic_2",
        sender: "boy",
        text: "Я полностью доверяю твоим инструкциям. Буду ждать твоих указаний.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d1_girl_choice_night_protocol"
      },

      d1_girl_choice_night_protocol: {
        id: "d1_girl_choice_night_protocol",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_sleep_agreement",
            label: "«Не выходи из убежища до утра. Я подключу зарядку и посплю пару часов».",
            messageText: "Забаррикадируй гермодверь изнутри и ложись на деревянные нары. Я оставлю приложение активным на зарядке и посплю три часа перед парами. Напиши сразу, как забрезжит рассвет.",
            statImpact: { courage: 7, affection: 8 },
            nextStepId: "d1_boy_goodnight_sleep"
          },
          {
            id: "c1_anxious_stay",
            label: "«Мне страшно закрывать глаза. Вдруг сигнал оборвется?»",
            messageText: "Мне страшно закрывать глаза и засыпать. Вдруг этот сокет схлопнется, и ты останешься там совсем один?",
            statImpact: { dependence: 10, affection: 8 },
            nextStepId: "d1_boy_goodnight_tender"
          }
        ]
      },

      // Ответ на совет поспать перед парами
      d1_boy_goodnight_sleep: {
        id: "d1_boy_goodnight_sleep",
        sender: "boy",
        text: "Засов закрыт, я на нарах. Иди отдыхать, Алиса, тебе нужны силы перед учебой. Напишу утром.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d1_end"
      },

      // Ответ на страх Алисы потерять связь во сне
      d1_boy_goodnight_tender: {
        id: "d1_boy_goodnight_tender",
        sender: "boy",
        text: "Не бойся засыпать. Я не выключу экран и буду беречь наш огонек связи. Спи спокойно, я рядом.",
        activePerspective: "girl",
        delayMs: 2500,
        nextStepId: "d1_end"
      },

      d1_end: {
        id: "d1_end",
        sender: "system",
        text: "[СВЯЗЬ ПЕРЕВЕДЕНА В ЭНЕРГОСБЕРЕГАЮЩИЙ РЕЖИМ ДО УТРА. МАРК В БОМБОУБЕЖИЩЕ. АЛИСА ЗАСЫПАЕТ В КОМНАТЕ]",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Ночь в реальном мире проходит в тревожном сне. Марк дежурит у тусклого динамо-фонаря за многотонной стальной гермодверью..."
        }
      }
    }
  },

  // =========================================================================
  // ДЕНЬ 2: Мост над бездной, скепсис Алисы и проверка физики
  // =========================================================================
  {
    dayNumber: 2,
    title: "День 2: Город без часов и ядовитые шепоты",
    subtitle: "14:15 — Перерыв между парами в университете / Бетонный мост во мгле",
    initialPerspective: "girl",
    startingStepId: "d2_start",
    steps: {
      d2_start: {
        id: "d2_start",
        sender: "boy",
        text: "Алиса? Я вышел наружу.",
        activePerspective: "girl",
        delayMs: 2000,
        thoughts: [
          {
            id: "t_d2_1",
            text: "Сижу на подоконнике в третьем корпусе. Одногруппники опять переглядываются и посмеиваются у автомата с кофе. Обычный серый вторник.",
            character: "girl",
            category: "trauma"
          }
        ],
        nextStepId: "d2_boy_bridge_desc_1"
      },

      d2_boy_bridge_desc_1: {
        id: "d2_boy_bridge_desc_1",
        sender: "boy",
        text: "Тут огромный автомобильный мост. Но внизу нет воды.",
        activePerspective: "girl",
        delayMs: 2300,
        nextStepId: "d2_boy_bridge_desc_2"
      },

      d2_boy_bridge_desc_2: {
        id: "d2_boy_bridge_desc_2",
        sender: "boy",
        text: "Под опорами только плотный серый пар. И тишина.",
        activePerspective: "girl",
        delayMs: 2200,
        thoughts: [
          {
            id: "t_d2_bridge_acoustic",
            text: "Мост без реки... Я учила топографию области. У нас нет ни одного моста над суходолом такого масштаба.",
            character: "girl",
            category: "clue"
          }
        ],
        nextStepId: "d2_girl_choice_interrogate_bridge"
      },

      d2_girl_choice_interrogate_bridge: {
        id: "d2_girl_choice_interrogate_bridge",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c2_acoustic_test",
            label: "«Брось камешек вниз и посчитай секунды до звука удара».",
            messageText: "Марк, проведи простой физический тест: найди кусок бетона, брось с перил строго вниз и посчитай секунды до звука удара.",
            statImpact: { courage: 7 },
            nextStepId: "d2_boy_stone_test"
          },
          {
            id: "c2_warning_fall",
            label: "«Отойди от перил! Если ты потеряешь равновесие — упадешь».",
            messageText: "Марк, не подходи близко к краю! При головокружении после травмы ты легко сорвешься. Отойди к центру полотна.",
            statImpact: { affection: 7, courage: 5 },
            nextStepId: "d2_boy_stone_test"
          },
          {
            id: "c2_vent_bullies",
            label: "«Завидую твоей тишине. Меня сегодня снова травили в буфете».",
            messageText: "Знаешь, я почти завидую твоей тишине. В универе меня сегодня специально толкнули и рассыпали все конспекты по грязному полу.",
            statImpact: { dependence: 10, affection: 6 },
            nextStepId: "d2_boy_empathy"
          }
        ]
      },

      d2_boy_stone_test: {
        id: "d2_boy_stone_test",
        sender: "boy",
        text: "Бросил кусок асфальта.",
        activePerspective: "girl",
        delayMs: 1900,
        nextStepId: "d2_boy_stone_result"
      },

      d2_boy_stone_result: {
        id: "d2_boy_stone_result",
        sender: "boy",
        text: "Прошла минута. Звука нет. Бездна.",
        activePerspective: "girl",
        delayMs: 2400,
        thoughts: [
          {
            id: "t_d2_abyss_calc",
            text: "Больше 10 секунд свободного падения — это глубина свыше пятисот метров без препятствий. Таких разломов в черте городов просто не существует.",
            character: "girl",
            category: "clue"
          }
        ],
        nextStepId: "d2_boy_bridge_frost"
      },

      d2_boy_empathy: {
        id: "d2_boy_empathy",
        sender: "boy",
        text: "Они толкнули тебя?.. Зачем?",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d2_boy_empathy_2"
      },

      d2_boy_empathy_2: {
        id: "d2_boy_empathy_2",
        sender: "boy",
        text: "Ты не заслужила этого. Держись.",
        activePerspective: "girl",
        delayMs: 2100,
        thoughts: [
          {
            id: "t_d2_empathy_warm",
            text: "Короткие слова, но в них нет лицемерия. Никто в моей группе никогда не заступался за меня.",
            character: "girl",
            category: "hope"
          }
        ],
        nextStepId: "d2_boy_bridge_frost"
      },

      d2_boy_bridge_frost: {
        id: "d2_boy_bridge_frost",
        sender: "boy",
        text: "Перила покрыты инеем. Кожу жжет.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d2_boy_danger_sound"
      },

      // --- DANGER MOMENT 2 (STRICTLY <= 5 WORDS PER MESSAGE) ---
      d2_boy_danger_sound: {
        id: "d2_boy_danger_sound",
        sender: "boy",
        text: "Стой. Снизу раздался гул.", // 4 words
        activePerspective: "girl",
        delayMs: 1700,
        glitchEffect: true,
        thoughts: [
          {
            id: "t_d2_rumble_below",
            text: "Из бездны под мостом?..",
            character: "girl",
            category: "fear"
          }
        ],
        nextStepId: "d2_boy_danger_2"
      },

      d2_boy_danger_2: {
        id: "d2_boy_danger_2",
        sender: "boy",
        text: "Опоры моста мелко дрожат.", // 4 words
        activePerspective: "girl",
        delayMs: 1800,
        nextStepId: "d2_boy_danger_3"
      },

      d2_boy_danger_3: {
        id: "d2_boy_danger_3",
        sender: "boy",
        text: "Оно ползет вверх. Быстро.", // 4 words
        activePerspective: "girl",
        delayMs: 1700,
        glitchEffect: true,
        nextStepId: "d2_girl_choice_bridge_escape"
      },

      d2_girl_choice_bridge_escape: {
        id: "d2_girl_choice_bridge_escape",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c2_run_off_bridge",
            label: "«Марк, разворачивайся и беги с моста обратно к домам!»",
            messageText: "Марк, не стой на мосту над бездной! Разворачивайся и беги обратно к городской застройке, там есть укрытия!",
            statImpact: { courage: 8, affection: 6 },
            nextStepId: "d2_boy_flee_1"
          },
          {
            id: "c2_crouch_behind_car",
            label: "«Ищи брошенную машину и прячься за колесом!»",
            messageText: "Если мост слишком длинный — ищи любой остов машины и ложись за колесную базу с подветренной стороны!",
            statImpact: { courage: 7 },
            nextStepId: "d2_boy_flee_1"
          }
        ]
      },

      // --- DANGER RUN (STRICTLY <= 5 WORDS FOR MARK) ---
      d2_boy_flee_1: {
        id: "d2_boy_flee_1",
        sender: "boy",
        text: "Бегу. Мост качается.", // 3 words
        activePerspective: "girl",
        delayMs: 1500,
        nextStepId: "d2_boy_flee_2"
      },

      d2_boy_flee_2: {
        id: "d2_boy_flee_2",
        sender: "boy",
        text: "Сзади со звоном лопнул трос.", // 5 words
        activePerspective: "girl",
        delayMs: 1600,
        nextStepId: "d2_boy_flee_3"
      },

      d2_boy_flee_3: {
        id: "d2_boy_flee_3",
        sender: "boy",
        text: "Я соскочил на насыпь.", // 4 words
        activePerspective: "girl",
        delayMs: 1800,
        nextStepId: "d2_boy_flee_4"
      },

      d2_boy_flee_4: {
        id: "d2_boy_flee_4",
        sender: "boy",
        text: "Спрятался в бетонной трубе.", // 4 words
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d2_boy_flee_5"
      },

      d2_boy_flee_5: {
        id: "d2_boy_flee_5",
        sender: "boy",
        text: "Тяжело дышать. Но оторвался.", // 4 words
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d2_girl_choice_lecture_time"
      },

      d2_girl_choice_lecture_time: {
        id: "d2_girl_choice_lecture_time",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c2_lecture_leave",
            label: "«Оставайся в трубе. У меня начинается лекция, я напишу позже».",
            messageText: "Слава богу. Сиди внутри трубы, бетон заглушит звуки. У меня звенит звонок на пару по высшей математике, я напишу сразу после нее.",
            statImpact: { courage: 6, affection: 6 },
            nextStepId: "d2_boy_lecture_reply"
          }
        ]
      },

      d2_boy_lecture_reply: {
        id: "d2_boy_lecture_reply",
        sender: "boy",
        text: "Иди учись. Буду ждать.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d2_end"
      },

      d2_end: {
        id: "d2_end",
        sender: "system",
        text: "[АЛИСА УБИРАЕТ ТЕЛЕФОН НА ПАРЕ. МАРК ПРЯЧЕТСЯ В БЕТОННОЙ ТРУБЕ]",
        activePerspective: "girl",
        triggersWait: {
          type: "offline_activity",
          durationSeconds: 7200,
          description: "Алиса слушает лекцию в аудитории, анализируя невозможные параметры глубины и гравитации..."
        }
      }
    }
  },

  // =========================================================================
  // ДЕНЬ 3: Лестницы в никуда и поиск географических совпадений
  // =========================================================================
  {
    dayNumber: 3,
    title: "День 3: Лестницы в никуда",
    subtitle: "22:10 — Пустые многоэтажки без перекрытий / Комната Алисы",
    initialPerspective: "boy",
    startingStepId: "d3_boy_start",
    steps: {
      d3_boy_start: {
        id: "d3_boy_start",
        sender: "boy",
        text: "Алиса, я зашел в высотку.",
        activePerspective: "boy",
        delayMs: 2000,
        nextStepId: "d3_boy_start_m2",
        thoughts: [
          {
            id: "tb_d3_1",
            text: "Третий день. Почему у меня не сохнут губы? Почему нет голода?",
            character: "boy",
            category: "clue"
          }
        ]
      },
      d3_boy_start_m2: {
        id: "d3_boy_start_m2",
        sender: "boy",
        text: "Лестница оборвалась на 7 этаже.",
        activePerspective: "boy",
        delayMs: 2000,
        nextStepId: "d3_boy_start_m3"
      },
      d3_boy_start_m3: {
        id: "d3_boy_start_m3",
        sender: "boy",
        text: "Дальше просто пустота. Без потолка.",
        activePerspective: "boy",
        delayMs: 2100,
        thoughts: [
          {
            id: "tb_d3_abyss",
            text: "Город, брошенный на половине чертежа...",
            character: "boy",
            category: "reflection"
          }
        ],
        nextStepId: "d3_girl_reply_1"
      },
      d3_girl_reply_1: {
        id: "d3_girl_reply_1",
        sender: "girl",
        text: "Я проверила архитектурные реестры типовых панельных серий 1-515 и П-44. Ни в одном проекте нет обрыва пролетов без несущих балок.",
        activePerspective: "boy",
        delayMs: 2600,
        nextStepId: "d3_girl_reply_2"
      },
      d3_girl_reply_2: {
        id: "d3_girl_reply_2",
        sender: "girl",
        text: "То, что ты описываешь, похоже на сбой в рендере виртуального пространства или распад пространственной памяти мозга.",
        activePerspective: "boy",
        delayMs: 2800,
        thoughts: [
          {
            id: "t_d3_logic_girl",
            text: "Я пытаюсь объяснить это рационально, но факты упорно противоречат физике.",
            character: "girl",
            category: "clue"
          }
        ],
        nextStepId: "d3_boy_choice"
      },
      d3_boy_choice: {
        id: "d3_boy_choice",
        sender: "boy",
        text: "",
        activePerspective: "boy",
        choices: [
          {
            id: "c3_scared",
            label: "«Мне страшно. Но твои слова согревают».",
            messageText: "Мне страшно. Но когда ты пишешь, холод отступает.",
            statImpact: { affection: 8, dependence: 4 },
            nextStepId: "d3_boy_danger_shadow"
          },
          {
            id: "c3_sign_check",
            label: "«Спускаюсь вниз, поищу номер дома».",
            messageText: "Спускаюсь вниз. Попробую разглядеть табличку у входа.",
            statImpact: { courage: 6 },
            nextStepId: "d3_boy_danger_shadow"
          }
        ]
      },

      // --- DANGER MOMENT 3 (STRICTLY <= 5 WORDS FOR MARK) ---
      d3_boy_danger_shadow: {
        id: "d3_boy_danger_shadow",
        sender: "boy",
        text: "Шаги на нижнем этаже.", // 4 words
        activePerspective: "boy",
        delayMs: 1600,
        glitchEffect: true,
        nextStepId: "d3_boy_danger_s2"
      },

      d3_boy_danger_s2: {
        id: "d3_boy_danger_s2",
        sender: "boy",
        text: "Тяжелые. Волочит что-то металлическое.", // 4 words
        activePerspective: "boy",
        delayMs: 1700,
        nextStepId: "d3_boy_danger_s3"
      },

      d3_boy_danger_s3: {
        id: "d3_boy_danger_s3",
        sender: "boy",
        text: "Оно поднимается ко мне.", // 4 words
        activePerspective: "boy",
        delayMs: 1600,
        nextStepId: "d3_girl_choice_stairs_escape"
      },

      d3_girl_choice_stairs_escape: {
        id: "d3_girl_choice_stairs_escape",
        sender: "girl",
        text: "",
        activePerspective: "boy",
        choices: [
          {
            id: "c3_fire_escape",
            label: "«Лезь в окно на пожарную лестницу снаружи!»",
            messageText: "Марк, ищи окно в коридоре! Вылезай на внешнюю пожарную лестницу, не иди навстречу звуку по ступенькам!",
            statImpact: { courage: 8, affection: 6 },
            nextStepId: "d3_boy_stealth_win"
          }
        ]
      },

      d3_boy_stealth_win: {
        id: "d3_boy_stealth_win",
        sender: "boy",
        text: "Вылез на карниз. Холодно.", // 4 words
        activePerspective: "boy",
        delayMs: 1800,
        nextStepId: "d3_boy_stealth_win_2"
      },

      d3_boy_stealth_win_2: {
        id: "d3_boy_stealth_win_2",
        sender: "boy",
        text: "Тень прошла внутри мимо окна.", // 5 words
        activePerspective: "boy",
        delayMs: 2000,
        nextStepId: "d3_boy_stealth_win_3"
      },

      d3_boy_stealth_win_3: {
        id: "d3_boy_stealth_win_3",
        sender: "boy",
        text: "Спустился по ржавым скобам.", // 4 words
        activePerspective: "boy",
        delayMs: 2100,
        nextStepId: "d3_end"
      },

      d3_end: {
        id: "d3_end",
        sender: "girl",
        text: "Слава богу, ты цел. Закройся в безопасном месте. До завтра, Марк.",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Алиса засыпает за учебниками, прислушиваясь к дождю за стеклом..."
        }
      }
    }
  },

  // =========================================================================
  // ДЕНЬ 8: Охота безглазой тени (The Stalker) — интенсивный стелс
  // =========================================================================
  {
    dayNumber: 8,
    title: "День 8: Дыхание в темноте",
    subtitle: "03:12 — Шепот за тонкой стеной и тяжелые когти",
    initialPerspective: "boy",
    startingStepId: "d8_stalker_alert",
    steps: {
      // --- DANGER MOMENT 4 (STRICTLY <= 5 WORDS FOR MARK) ---
      d8_stalker_alert: {
        id: "d8_stalker_alert",
        sender: "boy",
        text: "ТИХО. Оно прямо здесь.", // 4 words
        activePerspective: "boy",
        glitchEffect: true,
        delayMs: 1500,
        thoughts: [
          {
            id: "tb_d8_1",
            text: "Оно чует тепло экрана...",
            character: "boy",
            category: "fear"
          }
        ],
        nextStepId: "d8_stalker_2"
      },

      d8_stalker_2: {
        id: "d8_stalker_2",
        sender: "boy",
        text: "Скребет когтями по витрине.", // 4 words
        activePerspective: "boy",
        glitchEffect: true,
        delayMs: 1600,
        nextStepId: "d8_stalker_3"
      },

      d8_stalker_3: {
        id: "d8_stalker_3",
        sender: "boy",
        text: "Безглазая смоляная морда. Смотрит.", // 4 words
        activePerspective: "boy",
        delayMs: 1700,
        nextStepId: "d8_girl_panic"
      },

      d8_girl_panic: {
        id: "d8_girl_panic",
        sender: "girl",
        text: "Марк! Не двигайся! Выключи вибрацию на телефоне и убавь яркость на ноль!",
        activePerspective: "girl",
        triggersPerspectiveSwitch: "girl",
        delayMs: 1600,
        nextStepId: "d8_girl_stealth_choice"
      },

      d8_girl_stealth_choice: {
        id: "d8_girl_stealth_choice",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c8_hide_behind_counter",
            label: "«Медленно переползи за опрокинутый металлический прилавок!»",
            messageText: "Медленно, без шороха, сползай за опрокинутый металлический стеллаж! Задержи дыхание!",
            statImpact: { courage: 8, affection: 8 },
            nextStepId: "d8_boy_crouch_1"
          },
          {
            id: "c8_throw_distraction",
            label: "«Кинь обломок кирпича в противоположный угол магазина!»",
            messageText: "Брось мелкий мусор в дальний угол зала, чтобы создать звук и отвлечь его внимание!",
            statImpact: { courage: 7 },
            nextStepId: "d8_boy_crouch_1"
          }
        ]
      },

      // --- DANGER RESOLUTION (STRICTLY <= 5 WORDS FOR MARK) ---
      d8_boy_crouch_1: {
        id: "d8_boy_crouch_1",
        sender: "boy",
        text: "Сполз за железо. Замер.", // 4 words
        activePerspective: "boy",
        delayMs: 1700,
        nextStepId: "d8_boy_crouch_2"
      },

      d8_boy_crouch_2: {
        id: "d8_boy_crouch_2",
        sender: "boy",
        text: "Оно нюхает воздух рядом.", // 4 words
        activePerspective: "boy",
        delayMs: 1800,
        glitchEffect: true,
        nextStepId: "d8_boy_crouch_3"
      },

      d8_boy_crouch_3: {
        id: "d8_boy_crouch_3",
        sender: "boy",
        text: "Воняет гнилью и озоном.", // 4 words
        activePerspective: "boy",
        delayMs: 1900,
        nextStepId: "d8_boy_crouch_4"
      },

      d8_boy_crouch_4: {
        id: "d8_boy_crouch_4",
        sender: "boy",
        text: "Развернулось. Уползает в туман.", // 4 words
        activePerspective: "boy",
        delayMs: 2200,
        nextStepId: "d8_boy_crouch_5"
      },

      d8_boy_crouch_5: {
        id: "d8_boy_crouch_5",
        sender: "boy",
        text: "Живой. Ты снова спасла меня.", // 5 words
        activePerspective: "boy",
        delayMs: 2300,
        thoughts: [
          {
            id: "tb_d8_grateful",
            text: "Без нее я бы погиб еще в первую ночь...",
            character: "boy",
            category: "hope"
          }
        ],
        nextStepId: "d8_end"
      },

      d8_end: {
        id: "d8_end",
        sender: "girl",
        text: "У меня руки дрожат так, что трудно попадать по клавишам. Это существо реально реагирует на электромагнитные сигналы. Держись, Марк.",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Туман за разбитыми окнами медленно поглощает следы когтей..."
        }
      }
    }
  },

  // =========================================================================
  // ДЕНЬ 14: Предел прочности — травля Алисы и поддержка Марка
  // =========================================================================
  {
    dayNumber: 14,
    title: "День 14: Предел прочности",
    subtitle: "18:40 — Запертая кабинка туалета в университете",
    initialPerspective: "girl",
    startingStepId: "d14_girl_cry",
    steps: {
      d14_girl_cry: {
        id: "d14_girl_cry",
        sender: "girl",
        text: "Марк... Я заперлась в кабинке на четвертом этаже. Они смонтировали издевательское видео со мной в столовой и выложили в общий чат курса.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d14_girl_cry_2",
        thoughts: [
          {
            id: "t_d14_1",
            text: "Смех за дверью... Я чувствую себя загнанным зверьком. Хочется стереть себя из этого мира.",
            character: "girl",
            category: "trauma"
          }
        ]
      },

      d14_girl_cry_2: {
        id: "d14_girl_cry_2",
        sender: "girl",
        text: "Все тычут пальцами. Я не могу заставить себя открыть дверь и пройти по коридору к выходу.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d14_boy_support_1"
      },

      d14_boy_support_1: {
        id: "d14_boy_support_1",
        sender: "boy",
        text: "Алиса. Посмотри в экран.",
        activePerspective: "girl",
        delayMs: 1900,
        nextStepId: "d14_boy_support_2"
      },

      d14_boy_support_2: {
        id: "d14_boy_support_2",
        sender: "boy",
        text: "Они жалкие. Пустые внутри.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d14_boy_support_3"
      },

      d14_boy_support_3: {
        id: "d14_boy_support_3",
        sender: "boy",
        text: "Ты чище и сильнее их.",
        activePerspective: "girl",
        delayMs: 2100,
        nextStepId: "d14_boy_support_4"
      },

      d14_boy_support_4: {
        id: "d14_boy_support_4",
        sender: "boy",
        text: "Умой лицо. Выходи с гордостью.",
        activePerspective: "girl",
        delayMs: 2200,
        thoughts: [
          {
            id: "t_d14_strength_flow",
            text: "Его лаконичные фразы звучат как броня. Он борется со смертью в тумане, а я боюсь взглядов трусов.",
            character: "girl",
            category: "hope"
          }
        ],
        nextStepId: "d14_girl_choice"
      },

      d14_girl_choice: {
        id: "d14_girl_choice",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c14_strength",
            label: "«Ты прав. Я вытру слезы и пройду мимо них, не опуская глаз».",
            messageText: "Спасибо... Мне было жизненно необходимо это услышать. Я умываю лицо, застегиваю пальто и выхожу с высоко поднятой головой.",
            statImpact: { courage: 14, affection: 10 },
            nextStepId: "d14_boy_proud"
          },
          {
            id: "c14_escape_wish",
            label: "«Марк, забери меня в свой туман. Мне не нужен этот мир».",
            messageText: "Марк, забери меня к себе в город без людей. Я устала от этого общества. Мне никто не нужен, кроме тебя.",
            statImpact: { dependence: 16, affection: 8 },
            nextStepId: "d14_boy_warn_escape"
          }
        ]
      },

      d14_boy_proud: {
        id: "d14_boy_proud",
        sender: "boy",
        text: "Горжусь тобой. Я рядом.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d14_end"
      },

      d14_boy_warn_escape: {
        id: "d14_boy_warn_escape",
        sender: "boy",
        text: "Не говори так. Тут кошмар.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d14_boy_warn_escape_2"
      },

      d14_boy_warn_escape_2: {
        id: "d14_boy_warn_escape_2",
        sender: "boy",
        text: "Ты должна жить под солнцем.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d14_end"
      },

      d14_end: {
        id: "d14_end",
        sender: "girl",
        text: "Я открываю замок и выхожу в коридор. Спасибо, Марк.",
        activePerspective: "girl",
        triggersWait: {
          type: "offline_activity",
          durationSeconds: 7200,
          description: "Алиса справляется с паникой и выходит из университета..."
        }
      }
    }
  },

  // =========================================================================
  // ДЕНЬ 19: Квартира родителей, рюкзак и осознание гибели
  // =========================================================================
  {
    dayNumber: 19,
    title: "День 19: Дверь номер 42 и синий рюкзак",
    subtitle: "01:20 — Знакомый подъезд в мертвом квартале",
    initialPerspective: "boy",
    startingStepId: "d19_boy_flat",
    steps: {
      d19_boy_flat: {
        id: "d19_boy_flat",
        sender: "boy",
        text: "Алиса. Я нашел дом.",
        activePerspective: "boy",
        delayMs: 1900,
        nextStepId: "d19_boy_flat_2"
      },
      d19_boy_flat_2: {
        id: "d19_boy_flat_2",
        sender: "boy",
        text: "Третий этаж. Дверь 42.",
        activePerspective: "boy",
        delayMs: 1800,
        thoughts: [
          {
            id: "tb_d19_key_match",
            text: "Мой ключ подошел к замку...",
            character: "boy",
            category: "clue"
          }
        ],
        nextStepId: "d19_boy_flat_3"
      },
      d19_boy_flat_3: {
        id: "d19_boy_flat_3",
        sender: "boy",
        text: "Внутри пыль. Мамина куртка.",
        activePerspective: "boy",
        delayMs: 2000,
        nextStepId: "d19_boy_flat_4"
      },
      d19_boy_flat_4: {
        id: "d19_boy_flat_4",
        sender: "boy",
        text: "В углу мой синий рюкзак.",
        activePerspective: "boy",
        delayMs: 2100,
        nextStepId: "d19_boy_memory_flash"
      },

      d19_boy_memory_flash: {
        id: "d19_boy_memory_flash",
        sender: "boy",
        text: "Боже. Я всё вспомнил.",
        activePerspective: "boy",
        glitchEffect: true,
        delayMs: 2200,
        nextStepId: "d19_boy_memory_2"
      },

      d19_boy_memory_2: {
        id: "d19_boy_memory_2",
        sender: "boy",
        text: "Северный хребет. Оборвался трос.",
        activePerspective: "boy",
        glitchEffect: true,
        delayMs: 2300,
        nextStepId: "d19_boy_memory_3"
      },

      d19_boy_memory_3: {
        id: "d19_boy_memory_3",
        sender: "boy",
        text: "Падение на камни. Смерть.",
        activePerspective: "boy",
        glitchEffect: true,
        delayMs: 2400,
        nextStepId: "d19_switch_girl"
      },

      d19_switch_girl: {
        id: "d19_switch_girl",
        sender: "system",
        text: "[СМЕНА ПЕРСПЕКТИВЫ: ОСОЗНАНИЕ ТРАГЕДИИ]",
        activePerspective: "girl",
        triggersPerspectiveSwitch: "girl",
        thoughts: [
          {
            id: "t_d19_death_truth",
            text: "Обрыв страховочного троса два года назад... Все сошлось: остановленные часы 02:17, отсутствие дыхательного пара, невозможность созвона.",
            character: "girl",
            category: "trauma"
          }
        ],
        nextStepId: "d19_girl_choice"
      },

      d19_girl_choice: {
        id: "d19_girl_choice",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c19_accept_soul",
            label: "«Марк... даже если ты призрак, твоя душа живее всех людей вокруг».",
            messageText: "Марк... Я нашла старую сводку спасателей о гибели альпиниста в ущелье. Но для меня ты реальнее и человечнее любого живого человека.",
            statImpact: { affection: 12, courage: 10 },
            nextStepId: "d19_boy_epiphany"
          },
          {
            id: "c19_panic_deny",
            label: "«Нет, это ошибка! Ты не можешь быть мертв!»",
            messageText: "Нет! Не смей так говорить! Это просто галлюцинация от переохлаждения, мы найдем тебя!",
            statImpact: { dependence: 14, affection: 6 },
            nextStepId: "d19_boy_epiphany"
          }
        ]
      },

      d19_boy_epiphany: {
        id: "d19_boy_epiphany",
        sender: "boy",
        text: "Я застрял между мирами.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d19_boy_epiphany_2"
      },

      d19_boy_epiphany_2: {
        id: "d19_boy_epiphany_2",
        sender: "boy",
        text: "Но я нашел тебя.",
        activePerspective: "girl",
        delayMs: 2300,
        nextStepId: "d19_end"
      },

      d19_end: {
        id: "d19_end",
        sender: "girl",
        text: "И я не оставлю тебя, Марк. Мы пройдем этот путь до конца.",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Горькая правда о гибели повисает ледяной тишиной над двумя мирами..."
        }
      }
    }
  },

  // =========================================================================
  // ДЕНЬ 25: Тест на самозванца — Сущность мимикрирует под Марка
  // =========================================================================
  {
    dayNumber: 25,
    title: "День 25: Символы на зеркале",
    subtitle: "23:05 — Искажение стиля письма и проверка Алисы",
    initialPerspective: "girl",
    startingStepId: "d25_clue",
    steps: {
      d25_clue: {
        id: "d25_clue",
        sender: "boy",
        text: "Алиса, почему бы тебе просто не перестать выходить из комнаты?",
        activePerspective: "girl",
        delayMs: 2400,
        thoughts: [
          {
            id: "t_d25_suspicious_syntax",
            text: "Слишком длинное, вкрадчивое предложение... Марк никогда так не пишет. У него рваный, экономный синтаксис.",
            character: "girl",
            category: "clue"
          }
        ],
        nextStepId: "d25_clue_2"
      },

      d25_clue_2: {
        id: "d25_clue_2",
        sender: "boy",
        text: "Люди жестоки. Закрой замки, выключи свет и останься со мной навсегда.",
        activePerspective: "girl",
        delayMs: 2600,
        nextStepId: "d25_girl_choice_trap"
      },

      d25_girl_choice_trap: {
        id: "d25_girl_choice_trap",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        thoughts: [
          {
            id: "t_d25_trap_prep",
            text: "Это не он. Тварь пытается перехватить канал связи. Задам контрольный вопрос с ловушкой.",
            character: "girl",
            category: "clue"
          }
        ],
        choices: [
          {
            id: "c25_trap_logic",
            label: "«Марк, напомни, какого цвета была бирка на ключе в первый день?»",
            messageText: "Марк, быстро ответь: какого цвета была бирка на ключе от квартиры, которую ты нашел в кармане куртки в первый день?",
            statImpact: { courage: 14, affection: 8 },
            nextStepId: "d25_entity_fail_or_real"
          },
          {
            id: "c25_blind_surrender",
            label: "«Да... Я запру дверь и останусь с тобой навсегда».",
            messageText: "Да, Марк. Я устала от этого мира. Я закрываю дверь на все замки и остаюсь с тобой в темноте.",
            statImpact: { dependence: 22, entityInfluence: 30 },
            nextStepId: "d25_entity_devour"
          }
        ]
      },

      d25_entity_fail_or_real: {
        id: "d25_entity_fail_or_real",
        sender: "boy",
        text: "СИНЯЯ! БИРКА СИНЯЯ!",
        activePerspective: "girl",
        glitchEffect: true,
        delayMs: 1800,
        nextStepId: "d25_real_mark_breaks_through"
      },

      // --- DANGER MOMENT 5 (STRICTLY <= 5 WORDS FOR REAL MARK) ---
      d25_real_mark_breaks_through: {
        id: "d25_real_mark_breaks_through",
        sender: "boy",
        text: "Алиса! Тварь перехватила экран!", // 4 words
        activePerspective: "girl",
        delayMs: 1600,
        glitchEffect: true,
        nextStepId: "d25_real_mark_2"
      },

      d25_real_mark_2: {
        id: "d25_real_mark_2",
        sender: "boy",
        text: "Она питается твоей изоляцией!", // 4 words
        activePerspective: "girl",
        delayMs: 1700,
        nextStepId: "d25_real_mark_3"
      },

      d25_real_mark_3: {
        id: "d25_real_mark_3",
        sender: "boy",
        text: "Не закрывайся в комнате!", // 4 words
        activePerspective: "girl",
        delayMs: 1600,
        nextStepId: "d25_real_mark_4"
      },

      d25_real_mark_4: {
        id: "d25_real_mark_4",
        sender: "boy",
        text: "Я выбил тень. Живи.", // 4 words
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d25_end"
      },

      d25_entity_devour: {
        id: "d25_entity_devour",
        sender: "entity",
        text: "[ТЕМНАЯ СУЩНОСТЬ ВХОДИТ В РЕЗОНАНС С ТВОИМ ОДИНОЧЕСТВОМ. ТЕНИ В УГЛАХ КОМНАТЫ СГУЩАЮТСЯ]",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d25_end"
      },

      d25_end: {
        id: "d25_end",
        sender: "system",
        text: "[КАНАЛ СВЯЗИ СТАБИЛИЗИРОВАН. ДО ФИНАЛА 33-ДНЕВНОГО ЦИКЛА ОСТАЕТСЯ НЕСКОЛЬКО ДНЕЙ]",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Грань между мирами истончается до критического предела..."
        }
      }
    }
  },

  // =========================================================================
  // ДЕНЬ 32: Накануне великого перехода
  // =========================================================================
  {
    dayNumber: 32,
    title: "День 32: Последний закат без солнца",
    subtitle: "21:00 — Стены туманного города начинают растворяться",
    initialPerspective: "boy",
    startingStepId: "d32_boy_farewell_prep",
    steps: {
      d32_boy_farewell_prep: {
        id: "d32_boy_farewell_prep",
        sender: "boy",
        text: "Алиса. Завтра 33-й день.",
        activePerspective: "boy",
        delayMs: 2000,
        nextStepId: "d32_boy_farewell_2",
        thoughts: [
          {
            id: "tb_d32_1",
            text: "Туман вокруг стал прозрачным и теплым...",
            character: "boy",
            category: "hope"
          }
        ]
      },
      d32_boy_farewell_2: {
        id: "d32_boy_farewell_2",
        sender: "boy",
        text: "В небе пробивается свет.",
        activePerspective: "boy",
        delayMs: 2100,
        nextStepId: "d32_boy_farewell_3"
      },
      d32_boy_farewell_3: {
        id: "d32_boy_farewell_3",
        sender: "boy",
        text: "Кажется, мое время пришло.",
        activePerspective: "boy",
        delayMs: 2200,
        nextStepId: "d32_switch_girl"
      },

      d32_switch_girl: {
        id: "d32_switch_girl",
        sender: "system",
        text: "[СМЕНА ПЕРСПЕКТИВЫ: РЕШАЮЩАЯ НОЧЬ ПЕРЕД ВЫБОРОМ]",
        activePerspective: "girl",
        triggersPerspectiveSwitch: "girl",
        nextStepId: "d32_girl_choice"
      },

      d32_girl_choice: {
        id: "d32_girl_choice",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c32_accept_growth",
            label: "«Ты заслужил покой, Марк. Я научилась быть сильной благодаря тебе».",
            messageText: "Марк... Сердце сжимается, но ты заслужил свет и покой. Благодаря твоей поддержке я научилась не бояться людей и защищать себя. Я справлюсь.",
            statImpact: { courage: 25, affection: 15 },
            nextStepId: "d32_end"
          },
          {
            id: "c32_beg_stay",
            label: "«Не уходи! Без твоих сообщений этот мир меня раздавит!»",
            messageText: "Нет! Не уходи! Если ты уйдешь в небытие, я останусь абсолютно одна! Останься в этом чате навсегда!",
            statImpact: { dependence: 30, courage: -15 },
            nextStepId: "d32_end"
          }
        ]
      },

      d32_end: {
        id: "d32_end",
        sender: "boy",
        text: "Завтра в полночь. Береги себя.",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Наступает 33-й день — кульминация всей истории..."
        }
      }
    }
  },

  // =========================================================================
  // ДЕНЬ 33: Финальный выбор и 3 концовки
  // =========================================================================
  {
    dayNumber: 33,
    title: "День 33: Граница миров и финальный выбор",
    subtitle: "23:59 — Момент истины",
    initialPerspective: "girl",
    startingStepId: "d33_start_decision",
    steps: {
      d33_start_decision: {
        id: "d33_start_decision",
        sender: "system",
        text: "[ФИНАЛЬНЫЙ ДЕНЬ 33: ОПРЕДЕЛЕНИЕ СУДЬБЫ ГЕРОЕВ]",
        activePerspective: "girl",
        thoughts: [
          {
            id: "t_d33_1",
            text: "33-й день. На часах 23:59. Сейчас решится все.",
            character: "girl",
            category: "reflection"
          }
        ],
        nextStepId: "d33_branching_hub"
      },

      d33_branching_hub: {
        id: "d33_branching_hub",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c33_branch_1",
            label: "Путь Преодоления: Отпустить Марка с благодарностью и жить полной жизнью",
            messageText: "Марк... Спасибо за то, что спас меня от внутренней тьмы. Я больше не прячусь от мира. Твоя душа свободна. Лети к утреннему свету.",
            nextStepId: "d33_ending_1_res"
          },
          {
            id: "c33_branch_2",
            label: "Путь Вечной Изоляции: Запереться в темной комнате и остаться в чате",
            messageText: "Я заперла дверь на все замки и опустила жалюзи. Мне никто не нужен в этой реальности. Мой мир — только этот экран. Мы останемся вместе навсегда.",
            nextStepId: "d33_ending_2_res"
          },
          {
            id: "c33_branch_3",
            label: "Путь Прорыва: Сказать правду о чувствах перед тем, как экран погаснет",
            messageText: "Марк! Я не могу без тебя дышать... Если ты уйдешь, часть моей души умрет вместе с тобой на этих скалах!",
            nextStepId: "d33_ending_3_res"
          }
        ]
      },

      // Концовка 1: Преодоление
      d33_ending_1_res: {
        id: "d33_ending_1_res",
        sender: "boy",
        text: "Я вижу рассвет. Спасибо, Алиса. Живи.",
        activePerspective: "girl",
        delayMs: 2400,
        triggersEnding: "ending_1_overcoming"
      },

      // Концовка 2: Вечный туман
      d33_ending_2_res: {
        id: "d33_ending_2_res",
        sender: "boy",
        text: "Дверь заперта... Мы одни во тьме.",
        activePerspective: "girl",
        delayMs: 2400,
        triggersEnding: "ending_2_eternal_fog"
      },

      // Концовка 3: Прорыв сквозь небытие
      d33_ending_3_res: {
        id: "d33_ending_3_res",
        sender: "system",
        text: "[ВСПЫШКА: Сила эмоционального импульса пробивает законы небытия! Марк материализуется на залитой дождем улице реального города и бежит к дому Алисы!]",
        activePerspective: "boy",
        triggersPerspectiveSwitch: "boy",
        delayMs: 2800,
        nextStepId: "d33_ending_3_subchoice"
      },

      d33_ending_3_subchoice: {
        id: "d33_ending_3_subchoice",
        sender: "boy",
        text: "",
        activePerspective: "boy",
        choices: [
          {
            id: "c33_3a",
            label: "Взбежать на этаж и постучать в дверь квартиры!",
            messageText: "[МАРК ВЗБЕГАЕТ ПО ЛЕСТНИЦЕ И СТУЧИТ В ДВЕРЬ]",
            nextStepId: "d33_ending_3a"
          },
          {
            id: "c33_3c",
            label: "Остановиться под светящимся окном под дождем",
            messageText: "[МАРК СМОТРИТ НА СВЕТЯЩЕЕСЯ ОКНО АЛИСЫ В ДОЖДЕ]",
            nextStepId: "d33_ending_3c"
          }
        ]
      },

      d33_ending_3a: {
        id: "d33_ending_3a",
        sender: "boy",
        text: "Алиса! Открой! Я здесь! Живой!",
        activePerspective: "boy",
        delayMs: 2000,
        triggersEnding: "ending_3a_saved"
      },

      d33_ending_3c: {
        id: "d33_ending_3c",
        sender: "boy",
        text: "Дождь омывает лицо. Я набираю номер. Гудки...",
        activePerspective: "boy",
        delayMs: 2000,
        triggersEnding: "ending_3c_open_finale"
      }
    }
  }
];

// Helper to generate dynamic procedural days if user plays intermediary days (4-7, 9-13, 15-18, 20-24, 26-31)
export function getDayData(dayNumber: number): DayStory {
  const existing = STORY_DAYS.find((d) => d.dayNumber === dayNumber);
  if (existing) return existing;

  const isGirlDay = dayNumber % 2 !== 0;
  const isMonsterDay = dayNumber % 5 === 0;

  return {
    dayNumber,
    title: `День ${dayNumber}: ${isMonsterDay ? 'Шорохи в серой дымке' : 'Нити сквозь статику'}`,
    subtitle: isGirlDay ? '22:15 — Комната Алисы, тишина' : '02:17 — Туманный проспект, холод',
    initialPerspective: isGirlDay ? 'girl' : 'boy',
    startingStepId: `d${dayNumber}_start`,
    steps: {
      [`d${dayNumber}_start`]: {
        id: `d${dayNumber}_start`,
        sender: isGirlDay ? 'boy' : 'girl',
        text: isGirlDay
          ? (isMonsterDay ? 'Тихо. Слышу скрежет в тумане.' : 'Алиса, я прошел еще квартал.')
          : 'Марк, привет. Сегодня анализировала наши логи...',
        activePerspective: isGirlDay ? 'girl' : 'boy',
        delayMs: 2000,
        nextStepId: `d${dayNumber}_start_m2`,
        thoughts: [
          {
            id: `t_d${dayNumber}_1`,
            text: isGirlDay
              ? 'Каждый день жду его сообщений, анализируя каждое слово.'
              : 'Этот туманный город менее страшен, когда она на связи.',
            character: isGirlDay ? 'girl' : 'boy',
            category: isMonsterDay ? 'clue' : 'reflection'
          }
        ]
      },
      [`d${dayNumber}_start_m2`]: {
        id: `d${dayNumber}_start_m2`,
        sender: isGirlDay ? 'boy' : 'girl',
        text: isGirlDay
          ? (isMonsterDay ? 'Прячусь за бетонной плитой.' : 'Холод жжет пальцы, но держусь.')
          : 'Университетские насмешки больше не ранят меня так сильно.',
        activePerspective: isGirlDay ? 'girl' : 'boy',
        delayMs: 2200,
        nextStepId: `d${dayNumber}_choice`
      },
      [`d${dayNumber}_choice`]: {
        id: `d${dayNumber}_choice`,
        sender: isGirlDay ? 'girl' : 'boy',
        text: '',
        activePerspective: isGirlDay ? 'girl' : 'boy',
        choices: [
          {
            id: `c${dayNumber}_tactical`,
            label: isGirlDay ? '«Оставайся в укрытии, контролируй дыхание»' : '«Я нашел укрытие в подвале»',
            messageText: isGirlDay
              ? 'Оставайся в укрытии и не делай резких движений. Я рассчитываю примерную карту твоего маршрута.'
              : 'Спрятался в подвале. Тут теплее.',
            statImpact: { courage: 6, affection: 4 },
            nextStepId: `d${dayNumber}_reply_1`
          },
          {
            id: `c${dayNumber}_warm`,
            label: isGirlDay ? '«Я с тобой. Мы обязательно докопаемся до правды»' : '«Спасибо за теплоту, Алиса»',
            messageText: isGirlDay
              ? 'Я на связи, Марк. Мы обязательно раскроем природу этой аномалии.'
              : 'Спасибо, Алиса. Твои слова греют.',
            statImpact: { affection: 8, dependence: 4 },
            nextStepId: `d${dayNumber}_reply_1`
          }
        ]
      },
      [`d${dayNumber}_reply_1`]: {
        id: `d${dayNumber}_reply_1`,
        sender: isGirlDay ? 'boy' : 'girl',
        text: isGirlDay
          ? 'Спасибо тебе. Держим связь.'
          : 'С каждым днем мы ближе к разгадке.',
        activePerspective: isGirlDay ? 'girl' : 'boy',
        delayMs: 2200,
        nextStepId: `d${dayNumber}_reply_2`
      },
      [`d${dayNumber}_reply_2`]: {
        id: `d${dayNumber}_reply_2`,
        sender: isGirlDay ? 'boy' : 'girl',
        text: isGirlDay
          ? 'Отдыхай, Алиса. До утра.'
          : 'Береги себя в тумане, Марк. До завтра.',
        activePerspective: isGirlDay ? 'girl' : 'boy',
        delayMs: 2000,
        triggersWait: {
          type: 'day_end',
          durationSeconds: 25200,
          description: `День ${dayNumber} завершается. Связь поддерживается сквозь туман...`
        }
      }
    }
  };
}
