import { DayStory } from '../types/game';

export const STORY_DAYS: DayStory[] = [
  // ==========================================
  // ДЕНЬ 1: Внезапное эхо сквозь туман Лимбо
  // ==========================================
  {
    dayNumber: 1,
    title: "День 1: Черный экран и непрошеная иконка",
    subtitle: "23:47 — Неизвестное приложение / 02:17 — Одинокий фонарь в серой мгле",
    initialPerspective: "girl",
    startingStepId: "d1_girl_intro",
    steps: {
      d1_girl_intro: {
        id: "d1_girl_intro",
        sender: "system",
        text: "[Инициализация Null_Echo v0.9b... Поиск парного узла связи... Канал 0x7F-LIMBO захвачен]",
        activePerspective: "girl",
        thoughts: [
          {
            id: "t_d1_1",
            text: "Что за странная иконка на экране? Черный круг с разорванной белой чертой... Я точно ничего не скачивала.",
            character: "girl",
            category: "clue"
          },
          {
            id: "t_d1_2",
            text: "Почти полночь. Опять бессонница. Мысли о завтрашнем универе сдавливают виски... Снова видеть эти насмешливые лица.",
            character: "girl",
            category: "trauma"
          }
        ],
        nextStepId: "d1_girl_choice_start"
      },

      d1_girl_choice_start: {
        id: "d1_girl_choice_start",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_inspect_app",
            label: "Попробовать смахнуть окно и удалить приложение",
            messageText: "Что это за вирус? Почему ты не закрываешься?",
            nextStepId: "d1_girl_swipe_fail",
            statImpact: { courage: 2 }
          },
          {
            id: "c1_type_question",
            label: "Коснуться мигающей строки ввода: «Кто здесь?»",
            messageText: "Кто здесь? Это какой-то розыгрыш одногруппников?",
            nextStepId: "d1_system_connecting",
            statImpact: { courage: 5 }
          },
          {
            id: "c1_silence_dots",
            label: "Отправить осторожные три точки: «...»",
            messageText: "...",
            nextStepId: "d1_system_connecting",
            statImpact: { dependence: 4 }
          }
        ]
      },

      d1_girl_swipe_fail: {
        id: "d1_girl_swipe_fail",
        sender: "system",
        text: "[СИСТЕМА: Ошибка деинсталляции. Процесс защищен корневым сертификатом. Входящий пакет данных...]",
        activePerspective: "girl",
        delayMs: 1400,
        nextStepId: "d1_boy_first_ping"
      },

      d1_system_connecting: {
        id: "d1_system_connecting",
        sender: "system",
        text: "[СИСТЕМА: Текстовый мост стабилизирован. Пинг: 14мс. Удаленный абонент активен]",
        activePerspective: "girl",
        delayMs: 1200,
        nextStepId: "d1_boy_first_ping"
      },

      // BURST 1: Mark wakes up and sends a sequence of 4 messages before prompting
      d1_boy_first_ping: {
        id: "d1_boy_first_ping",
        sender: "boy",
        text: "Эй?.. Тут кто-нибудь есть? Экран наконец-то загорелся... Ответьте, умоляю, если это читает живой человек.",
        activePerspective: "girl",
        delayMs: 2200,
        thoughts: [
          {
            id: "t_d1_3",
            text: "Он пишет в реальном времени... В словах чувствуется настоящий ужас.",
            character: "girl",
            category: "reflection"
          }
        ],
        nextStepId: "d1_boy_burst1_m2"
      },

      d1_boy_burst1_m2: {
        id: "d1_boy_burst1_m2",
        sender: "boy",
        text: "Я очнулся на ледяном асфальте... Голова раскалывается так, будто по черепу пришелся страшный удар при падении. Вокруг всё плывет и кружится перед глазами.",
        activePerspective: "girl",
        delayMs: 2500,
        nextStepId: "d1_boy_burst1_m3"
      },

      d1_boy_burst1_m3: {
        id: "d1_boy_burst1_m3",
        sender: "boy",
        text: "На мне моя походная штормовка, рукав разодран в клочья, пальцы в каменной пыли и ссадинах... Я даже встать на ноги толком не могу, опираюсь о холодный бетонный столб.",
        activePerspective: "girl",
        delayMs: 2700,
        nextStepId: "d1_boy_burst1_m4"
      },

      d1_boy_burst1_m4: {
        id: "d1_boy_burst1_m4",
        sender: "boy",
        text: "Пожалуйста, не закрывай окно... Скажи хоть слово, если ты видишь эти строки!",
        activePerspective: "girl",
        delayMs: 2000,
        thoughts: [
          {
            id: "t_d1_4",
            text: "Если это Денис или Катя из группы решили посмеяться надо мной среди ночи — я не поведусь. Но если человеку правда нужна помощь?..",
            character: "girl",
            category: "fear",
            isActionable: true
          }
        ],
        nextStepId: "d1_girl_choice_first_reply"
      },

      d1_girl_choice_first_reply: {
        id: "d1_girl_choice_first_reply",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_who_are_you",
            label: "Кто ты такой? Как ты попал в мой телефон?",
            messageText: "Кто ты такой? Как это приложение вообще установилось на мой телефон?",
            statImpact: { courage: 4 },
            nextStepId: "d1_boy_explain_who"
          },
          {
            id: "c1_suspect_bullies",
            label: "Если вы из университета решили поиздеваться — я блокирую номер.",
            messageText: "Если вы опять из университета решили надо мной поиздеваться среди ночи — я прямо сейчас удаляю этот чат.",
            statImpact: { courage: 6 },
            nextStepId: "d1_boy_explain_who"
          },
          {
            id: "c1_cautious_hello",
            label: "Да, я читаю. Дыши спокойно. Что с тобой случилось?",
            messageText: "Да, я читаю тебя. Дыши спокойно. Ты ранен? Что с тобой произошло?",
            statImpact: { affection: 6, courage: 3 },
            nextStepId: "d1_boy_explain_who"
          }
        ]
      },

      // BURST 2: Mark explains who he is, 112 failure, and the dead city environment (4 messages)
      d1_boy_explain_who: {
        id: "d1_boy_explain_who",
        sender: "boy",
        text: "Стой, не блокируй, умоляю! Я не из твоего университета и вообще никого не разыгрываю... Меня зовут Марк. Я сам понятия не имею, как эта программа заработала на разбитом экране.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d1_boy_burst2_m2"
      },

      d1_boy_burst2_m2: {
        id: "d1_boy_burst2_m2",
        sender: "boy",
        text: "В службу 112 я пытался звонить первым делом! Но в трубке нет даже длинных гудков — только мертвый треск, переходящий в тяжелый глухой гул. Ни один номер не набирается. Полоски связи на нуле.",
        activePerspective: "girl",
        delayMs: 2700,
        nextStepId: "d1_boy_burst2_m3"
      },

      d1_boy_burst2_m3: {
        id: "d1_boy_burst2_m3",
        sender: "boy",
        text: "А вокруг... Я иду вдоль бесконечного проспекта. Стоят панельные девятиэтажки, знакомые серые балконы, но в них нет НИ ОДНОГО горящего окна. Ни машин на парковках, ни людей, ни бродячих собак. Мертвая, абсолютная тишина.",
        activePerspective: "girl",
        delayMs: 3100,
        nextStepId: "d1_boy_burst2_m4"
      },

      d1_boy_burst2_m4: {
        id: "d1_boy_burst2_m4",
        sender: "boy",
        text: "И этот туман... Он стелется прямо над асфальтом, поднимаясь до колен. Пахнет странно — смесью озона, сырого известняка и перегоревших ламп. Я чувствую ледяной холод сквозь куртку, но пар изо рта не идет вообще.",
        activePerspective: "girl",
        delayMs: 3000,
        thoughts: [
          {
            id: "t_d1_7",
            text: "Пар изо рта не идет на морозе?.. Это физически невозможно в реальном мире.",
            character: "girl",
            category: "clue"
          },
          {
            id: "t_d1_8",
            text: "За моим окном монотонно барабанит дождь по карнизу. Моя комната кажется теплым островком.",
            character: "girl",
            category: "reflection"
          }
        ],
        nextStepId: "d1_girl_choice_weather"
      },

      d1_girl_choice_weather: {
        id: "d1_girl_choice_weather",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_distrust_prank_weather",
            label: "Откуда мне знать, что ты не врешь? Что вообще вокруг тебя?",
            messageText: "Откуда мне знать, что ты не разыгрываешь меня? Докажи: посмотри наверх, что на небе?",
            statImpact: { courage: 6 },
            nextStepId: "d1_boy_sky_answer"
          },
          {
            id: "c1_check_sky",
            label: "Посмотри на небо. Звезды или луна есть?",
            messageText: "Подними голову вверх. Что на небе? Звезды, луна, облака?",
            statImpact: { affection: 4, courage: 3 },
            nextStepId: "d1_boy_sky_answer"
          },
          {
            id: "c1_check_pockets_early",
            label: "Марк, проверь свои карманы! Что у тебя с собой из вещей?",
            messageText: "Марк, проверь карманы своей походной куртки! Должны же быть ключи, документы или хоть что-то?",
            statImpact: { courage: 5, affection: 4 },
            nextStepId: "d1_boy_sky_answer"
          }
        ]
      },

      // BURST 3: Mark describes the ash dome sky, frozen clock 02:17, and items in pockets (4 messages)
      d1_boy_sky_answer: {
        id: "d1_boy_sky_answer",
        sender: "boy",
        text: "Я смотрю вверх прямо сейчас... Тут нет неба, Алиса. Над головой просто плотный, неподвижный серо-пепельный купол. Ни луны, ни звезд, ни просветов.",
        activePerspective: "girl",
        delayMs: 2600,
        nextStepId: "d1_boy_burst3_m2"
      },

      d1_boy_burst3_m2: {
        id: "d1_boy_burst3_m2",
        sender: "boy",
        text: "А вверху экрана... часы намертво застыли на 02:17. И секунды не двигаются уже целую вечность. У тебя сколько сейчас времени?",
        activePerspective: "girl",
        delayMs: 2500,
        nextStepId: "d1_boy_burst3_m3"
      },

      d1_boy_burst3_m3: {
        id: "d1_boy_burst3_m3",
        sender: "boy",
        text: "Сейчас... Я проверяю карманы куртки, как ты просила. В правом кармане — латунный ключ с потертой синей биркой «42». И тяжелый металлический карабин...",
        activePerspective: "girl",
        delayMs: 3100,
        nextStepId: "d1_boy_burst3_m4"
      },

      d1_boy_burst3_m4: {
        id: "d1_boy_burst3_m4",
        sender: "boy",
        text: "А во внутреннем кармане — старые механические часы... Стекло разбито паутиной трещин, а стрелки замерли... Боже. На них тоже ровно 02:17. Точно как на экране телефона.",
        activePerspective: "girl",
        delayMs: 3300,
        thoughts: [
          {
            id: "t_d1_13",
            text: "Ключ от квартиры 42, карабин и разбитые часы на 02:17... Но что с ним произошло?",
            character: "girl",
            category: "clue"
          },
          {
            id: "t_d1_14",
            text: "Время остановилось ровно в 02:17. Это похоже на какую-то аномалию...",
            character: "girl",
            category: "fear",
            isActionable: true
          }
        ],
        nextStepId: "d1_girl_choice_watch_reaction"
      },

      d1_girl_choice_watch_reaction: {
        id: "d1_girl_choice_watch_reaction",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_distrust_time_anomaly",
            label: "Часы на 02:17?.. Это звучит как бред или розыгрыш.",
            messageText: "Часы остановились на 02:17, пустой город... Марк, это звучит безумно. Ты уверен, что не разыгрываешь меня?",
            statImpact: { courage: 6 },
            nextStepId: "d1_boy_cliff_memory_flow"
          },
          {
            id: "c1_cliff_fall_ask",
            label: "Марк, ты помнишь, где ты был до того, как разбились часы?",
            messageText: "Марк, ты помнишь, что случилось до того, как разбились часы? Где ты был?",
            statImpact: { affection: 7, courage: 4 },
            nextStepId: "d1_boy_cliff_memory_flow"
          },
          {
            id: "c1_action_give_name",
            label: "Меня зовут Алиса. Не делай резких движений, Марк.",
            messageText: "Меня зовут Алиса. Дыши медленно, Марк. Мы разберемся вместе, ты не один.",
            statImpact: { affection: 8, courage: 5 },
            nextStepId: "d1_boy_cliff_memory_flow"
          }
        ]
      },

      // BURST 4: Mark's amnesia - he remembers nothing except his name and feelings (4 messages)
      d1_boy_cliff_memory_flow: {
        id: "d1_boy_cliff_memory_flow",
        sender: "boy",
        text: "Алиса... Какое теплое и красивое имя. Спасибо тебе. Когда я произношу его, паника в груди чуть-чуть отступает.",
        activePerspective: "girl",
        delayMs: 2500,
        nextStepId: "d1_boy_burst4_m2"
      },

      d1_boy_burst4_m2: {
        id: "d1_boy_burst4_m2",
        sender: "boy",
        text: "Ты спросила, что я помню... Я отчаянно пытаюсь зацепиться за мысли, но в голове только серый шум и вспышки резкой боли. Словно ластиком стерли всю мою жизнь.",
        activePerspective: "girl",
        delayMs: 3000,
        nextStepId: "d1_boy_burst4_m3"
      },

      d1_boy_burst4_m3: {
        id: "d1_boy_burst4_m3",
        sender: "boy",
        text: "Я помню только свое имя — Марк. И смутное ощущение, что я бесконечно долго шел сквозь холод и темноту, пытаясь куда-то успеть... А потом очнулся здесь на асфальте с раскалывающейся головой.",
        activePerspective: "girl",
        delayMs: 3200,
        nextStepId: "d1_boy_burst4_m4"
      },

      d1_boy_burst4_m4: {
        id: "d1_boy_burst4_m4",
        sender: "boy",
        text: "Почему вокруг ни души? Где жители этих домов? Неужели город эвакуировали из-за аварии, а меня забыли?.. Мне страшно, Алиса.",
        activePerspective: "girl",
        delayMs: 3200,
        thoughts: [
          {
            id: "t_d1_15",
            text: "У него посттравматическая амнезия... Он совсем ничего не помнит, кроме своего имени.",
            character: "girl",
            category: "clue"
          },
          {
            id: "t_d1_16",
            text: "Он напуган до смерти. Я должна помочь ему держаться и найти укрытие.",
            character: "girl",
            category: "hope",
            isActionable: true
          }
        ],
        nextStepId: "d1_girl_choice_cliff_empathy"
      },

      d1_girl_choice_cliff_empathy: {
        id: "d1_girl_choice_cliff_empathy",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_distrust_amnesia",
            label: "Ты правда помнишь только имя? Или скрываешь что-то?",
            messageText: "Ты правда ничего не помнишь, кроме имени, или просто не хочешь рассказывать? Кто ты на самом деле?",
            statImpact: { courage: 6 },
            nextStepId: "d1_boy_room_ask_flow"
          },
          {
            id: "c1_mountain_empathy",
            label: "Марк, не паникуй из-за памяти. Память вернется постепенно.",
            messageText: "Марк, не пытайся насильно вспомнить всё сразу, если голова раскалывается. Память вернется постепенно. Главное — дыши.",
            statImpact: { affection: 8, dependence: 5 },
            nextStepId: "d1_boy_room_ask_flow"
          },
          {
            id: "c1_action_comfort_pain",
            label: "Я с тобой. Мы обязательно всё выясним вместе.",
            messageText: "Я с тобой на связи, Марк. Мы обязательно во всем разберемся вместе. Расскажи, что вокруг.",
            statImpact: { affection: 9 },
            nextStepId: "d1_boy_room_ask_flow"
          }
        ]
      },

      // BURST 5: Mark connects with Alice's world, then senses the approaching Entity (4 messages)
      d1_boy_room_ask_flow: {
        id: "d1_boy_room_ask_flow",
        sender: "boy",
        text: "Ты тоже чувствуешь эту усталость от людей, Алиса?.. Расскажи мне что-нибудь о своем мире. Где ты сейчас? В какой комнате?",
        activePerspective: "girl",
        delayMs: 2700,
        nextStepId: "d1_boy_burst5_m2"
      },

      d1_boy_burst5_m2: {
        id: "d1_boy_burst5_m2",
        sender: "boy",
        text: "Мне жизненно необходимо слышать детали настоящей, теплой жизни. Запах заваренного чая, шорох одеяла... Это словно якорь среди этих мертвых бетонных стен.",
        activePerspective: "girl",
        delayMs: 2900,
        nextStepId: "d1_boy_burst5_m3"
      },

      d1_boy_burst5_m3: {
        id: "d1_boy_burst5_m3",
        sender: "boy",
        text: "Алиса... Стой. Замолчи на секунду. Не пиши ничего. Пожалуйста.",
        activePerspective: "girl",
        delayMs: 1800,
        glitchEffect: true,
        nextStepId: "d1_boy_burst5_m4"
      },

      d1_boy_burst5_m4: {
        id: "d1_boy_burst5_m4",
        sender: "boy",
        text: "В тумане... дальше по проспекту. Там что-то шевелится. Я слышу тяжелый, скребущий звук, как будто по сырому асфальту волочат ржавые металлические цепи. И фонарь в ста метрах впереди только что со звоном погас.",
        activePerspective: "girl",
        delayMs: 3300,
        thoughts: [
          {
            id: "t_d1_20",
            text: "Господи... Он там не один в этом тумане. Что-то приближается к нему!",
            character: "girl",
            category: "fear"
          },
          {
            id: "t_d1_21",
            text: "Надо срочно сказать ему спрятаться! Нельзя оставаться посреди открытой дороги!",
            character: "girl",
            category: "clue",
            isActionable: true
          }
        ],
        nextStepId: "d1_girl_choice_threat_action"
      },

      d1_girl_choice_threat_action: {
        id: "d1_girl_choice_threat_action",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_distrust_trap_threat",
            label: "Не двигайся и не шуми! Вдруг это ловушка?",
            messageText: "Замри на месте! Не издавай ни звука и убери яркость экрана на минимум. Вдруг это ловушка?",
            statImpact: { courage: 6 },
            nextStepId: "d1_boy_running_to_shelter"
          },
          {
            id: "c1_action_hide_vestibule",
            label: "Марк, уходи с дороги! Беги в ближайший подъезд!",
            messageText: "Марк, не стой на открытом проспекте! Забегай в ближайший подъезд или за угол панельного дома!",
            statImpact: { courage: 8, affection: 6 },
            nextStepId: "d1_boy_running_to_shelter"
          },
          {
            id: "c1_action_run_opposite",
            label: "Разворачивайся и беги назад со всех ног!",
            messageText: "Разворачивайся и беги назад в темноту со всех ног! Не оглядывайся!",
            statImpact: { courage: 6 },
            nextStepId: "d1_boy_running_to_shelter"
          }
        ]
      },

      // BURST 6: Mark dashes into shelter, Entity passes by, safe at radiator (4 messages)
      d1_boy_running_to_shelter: {
        id: "d1_boy_running_to_shelter",
        sender: "boy",
        text: "Бегу... Дыхание перехватило, холод режет горло! Справа подъезд панельки с массивной приоткрытой железной дверью. Я проскользнул в темный тамбур и прикрыл створку!",
        activePerspective: "girl",
        delayMs: 2800,
        nextStepId: "d1_boy_burst6_m2"
      },

      d1_boy_burst6_m2: {
        id: "d1_boy_burst6_m2",
        sender: "boy",
        text: "Оно... прошло прямо мимо. Сквозь грязное стекло двери я видел, как в тумане медленно скользнула огромная смоляная масса... Без ног, словно тяжелый клубящийся сгусток тьмы. От нее разило болотной гнилью и жженым железом.",
        activePerspective: "girl",
        delayMs: 3500,
        nextStepId: "d1_boy_burst6_m3"
      },

      d1_boy_burst6_m3: {
        id: "d1_boy_burst6_m3",
        sender: "boy",
        text: "Скрежет цепей затих дальше по проспекту. Я сижу на ступеньках, прижавшись спиной к еле теплой батарее в подъезде. Руки дрожат, но здесь сухо и ветер не достает.",
        activePerspective: "girl",
        delayMs: 2900,
        nextStepId: "d1_boy_burst6_m4"
      },

      d1_boy_burst6_m4: {
        id: "d1_boy_burst6_m4",
        sender: "boy",
        text: "Алиса... Если бы ты не крикнула мне спрятаться, я бы стоял посреди проспекта как вкопанный. Твои сообщения спасли мне жизнь.",
        activePerspective: "girl",
        delayMs: 2600,
        thoughts: [
          {
            id: "t_d1_24",
            text: "Его слова... Они отдаются странным теплом в груди. Меня давно никто так искренне не благодарил.",
            character: "girl",
            category: "hope"
          },
          {
            id: "t_d1_25",
            text: "Уже полпервого ночи. Завтра в восемь утра будильник в университет...",
            character: "girl",
            category: "reflection"
          }
        ],
        nextStepId: "d1_girl_choice_comfort_shelter"
      },

      d1_girl_choice_comfort_shelter: {
        id: "d1_girl_choice_comfort_shelter",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c1_distrust_goodnight",
            label: "Я всё еще не понимаю, кто ты, но сиди тихо. Мне надо поспать.",
            messageText: "Я всё еще не понимаю, кто ты и как работает этот чат, но сиди тихо в тамбуре до утра. Мне нужно поспать перед учебой.",
            statImpact: { courage: 5 },
            nextStepId: "d1_boy_final_goodnight"
          },
          {
            id: "c1_stay_inside",
            label: "Сиди в тамбуре и не выходи до утра. Я на связи.",
            messageText: "Слава богу, ты успел... Сиди тихо на лестнице и ни в коем случае не выходи наружу в туман. Я оставлю приложение открытым.",
            statImpact: { affection: 8, courage: 5 },
            nextStepId: "d1_boy_final_goodnight"
          },
          {
            id: "c1_promise_reply_break",
            label: "Я напишу тебе сразу на первой же перемене в универе.",
            messageText: "Я напишу тебе сразу, как будет перерыв между парами. Береги себя, Марк. Не рискуй.",
            statImpact: { affection: 9, courage: 6 },
            nextStepId: "d1_boy_final_goodnight"
          }
        ]
      },

      // BURST 7: Goodnight agreement and transition to Day 2
      d1_boy_final_goodnight: {
        id: "d1_boy_final_goodnight",
        sender: "boy",
        text: "Договорились. Я буду дежурить здесь у батареи и ждать твоего сообщения утром. Ложись спать, Алиса... Спасибо тебе за этот разговор. Спокойной ночи.",
        activePerspective: "girl",
        delayMs: 2600,
        nextStepId: "d1_end"
      },

      d1_end: {
        id: "d1_end",
        sender: "system",
        text: "[СВЯЗЬ ПЕРЕВЕДЕНА В ЭНЕРГОСБЕРЕГАЮЩИЙ РЕЖИМ ДО УТРА. МАРК НАХОДИТСЯ В УКРЫТИИ]",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200, // 7 hours pause
          description: "Ночь уступает место рассвету. Алиса пытается поспать пару часов перед тяжелым днем в университете, пока Марк несет вахту в тамбуре заброшенного дома..."
        }
      }
    }
  },

  // ==========================================
  // ДЕНЬ 2: Туман и Университетский коридор
  // ==========================================
  {
    dayNumber: 2,
    title: "День 2: Город без часов и ядовитые шепоты",
    subtitle: "14:15 — Перерыв между парами / Бесконечный серый мост",
    initialPerspective: "girl",
    startingStepId: "d2_start",
    steps: {
      d2_start: {
        id: "d2_start",
        sender: "boy",
        text: "Алиса! Ты тут? Я нашел очень странное место. Тут бесконечный бетонный мост, но под ним нет реки — только клубящийся густой пар.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d2_start_m2",
        thoughts: [
          {
            id: "t_d2_1",
            text: "Сижу одна на подоконнике в третьем корпусе... Опять они шепчутся за спиной.",
            character: "girl",
            category: "trauma"
          },
          {
            id: "t_d2_2",
            text: "Его сообщения отвлекают от этой удушающей тоски.",
            character: "girl",
            category: "hope"
          }
        ]
      },
      d2_start_m2: {
        id: "d2_start_m2",
        sender: "boy",
        text: "Часы на телефоне застыли ровно на 02:17 и ни на секунду не сдвигаются. А на перилах моста лежит тонкий слой инея.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d2_start_m3"
      },
      d2_start_m3: {
        id: "d2_start_m3",
        sender: "boy",
        text: "Я попробовал крикнуть в туман, но эхо не вернулось. Звук просто тонет в вязкой тишине.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d2_girl_choice1"
      },
      d2_girl_choice1: {
        id: "d2_girl_choice1",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c2_distrust_prank",
            label: "Ты всё еще продолжаешь эту игру? Я не верю тебе.",
            messageText: "Ты всё еще продолжаешь эту историю с пустым городом? Кто ты на самом деле и зачем пишешь мне?",
            statImpact: { courage: 6 },
            nextStepId: "d2_boy_explain"
          },
          {
            id: "c2_bridge",
            label: "Не подходи к краю моста. Это опасно.",
            messageText: "Марк, не подходи к краю, если ничего не видно! Почему ты не вызовешь такси или службу спасения?",
            statImpact: { affection: 8, courage: 4 },
            nextStepId: "d2_boy_explain"
          },
          {
            id: "c2_vent",
            label: "Мне бы сейчас в твой туман... подальше от людей.",
            messageText: "Знаешь, я бы всё отдала, чтобы оказаться в городе без людей. В универе меня сегодня снова облили кофе 'случайно'.",
            statImpact: { dependence: 10, affection: 6 },
            nextStepId: "d2_boy_empathy"
          }
        ]
      },
      d2_boy_explain: {
        id: "d2_boy_explain",
        sender: "boy",
        text: "Службы не отвечают, в трубке только белый шум и какой-то низкий скрежет.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d2_boy_explain_m2"
      },
      d2_boy_explain_m2: {
        id: "d2_boy_explain_m2",
        sender: "boy",
        text: "Но твой текст приходит мгновенно, словно мы соединены не сотовыми вышками, а чем-то иным.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d2_boy_curiosity"
      },
      d2_boy_empathy: {
        id: "d2_boy_empathy",
        sender: "boy",
        text: "Они облили тебя?.. Почему люди вокруг бывают такими бессмысленно жестокими?",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d2_boy_empathy_m2"
      },
      d2_boy_empathy_m2: {
        id: "d2_boy_empathy_m2",
        sender: "boy",
        text: "Не смей думать, что ты заслужила это. Ты кажешься невероятно искренней и доброй.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d2_boy_curiosity"
      },
      d2_boy_curiosity: {
        id: "d2_boy_curiosity",
        sender: "boy",
        text: "Расскажи мне, что ты видишь из своего окна прямо сейчас? Мне нужно хоть что-то живое, чтобы не сойти с ума среди этих серых плит.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d2_girl_choice2"
      },
      d2_girl_choice2: {
        id: "d2_girl_choice2",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c2_distrust_details",
            label: "Зачем тебе мои описания? Это подозрительно.",
            messageText: "Зачем тебе знать, где я нахожусь и что вижу вокруг? Это выглядит подозрительно, Марк.",
            statImpact: { courage: 5 },
            nextStepId: "d2_end_burst_1"
          },
          {
            id: "c2_rain",
            label: "Осенние деревья, мокрый асфальт и трамваи.",
            messageText: "У нас идет холодный дождь. Листья кружатся у остановки, люди прячутся под зонтами, звенят старые трамваи.",
            statImpact: { affection: 8 },
            nextStepId: "d2_end_burst_1"
          },
          {
            id: "c2_cold",
            label: "Серые кирпичные стены и чужие холодные взгляды.",
            messageText: "Только серый кафель коридора и компания парней, которые ржут над моей старой курткой.",
            statImpact: { dependence: 8, courage: 2 },
            nextStepId: "d2_end_burst_1"
          }
        ]
      },
      d2_end_burst_1: {
        id: "d2_end_burst_1",
        sender: "boy",
        text: "Спасибо тебе за этот образ... Я закрыл глаза и будто почувствовал запах влажного асфальта и прелой хвои.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d2_end"
      },
      d2_end: {
        id: "d2_end",
        sender: "boy",
        text: "Иди на пары, Алиса. Не давай им сломать твой свет. Я подожду тебя здесь под сводами моста.",
        activePerspective: "girl",
        delayMs: 2200,
        triggersWait: {
          type: "offline_activity",
          durationSeconds: 7200, // 2 hours lecture
          description: "Алиса убирает телефон в сумку и идет в аудиторию на семинар по истории..."
        }
      }
    }
  },

  // ==========================================
  // ДЕНЬ 3-7: Сближение и первые аномалии
  // ==========================================
  {
    dayNumber: 3,
    title: "День 3: Лестницы в никуда",
    subtitle: "22:10 — Пустые многоэтажки без перекрытий",
    initialPerspective: "boy",
    startingStepId: "d3_boy_start",
    steps: {
      d3_boy_start: {
        id: "d3_boy_start",
        sender: "boy",
        text: "Алиса, я зашел в высотный дом в надежде подняться на крышу и разглядеть горизонт.",
        activePerspective: "boy",
        delayMs: 2000,
        nextStepId: "d3_boy_start_m2",
        thoughts: [
          {
            id: "tb_d3_1",
            text: "Почему я не чувствую ни голода, ни жажды? Уже третий день...",
            character: "boy",
            category: "clue"
          },
          {
            id: "tb_d3_2",
            text: "Я помню, как упаковывал карабины... но куда я ехал?",
            character: "boy",
            category: "memory"
          }
        ]
      },
      d3_boy_start_m2: {
        id: "d3_boy_start_m2",
        sender: "boy",
        text: "Но бетонная лестница внутри просто обрывается на седьмом этаже в пустую серую бездну. Ни перил, ни пола.",
        activePerspective: "boy",
        delayMs: 2200,
        nextStepId: "d3_boy_start_m3"
      },
      d3_boy_start_m3: {
        id: "d3_boy_start_m3",
        sender: "boy",
        text: "Словно этот город построили из фрагментов чьих-то забытых воспоминаний и бросили недорисованным.",
        activePerspective: "boy",
        delayMs: 2200,
        nextStepId: "d3_girl_reply"
      },
      d3_girl_reply: {
        id: "d3_girl_reply",
        sender: "girl",
        text: "Марк, это звучит жутко. Ты уверен, что это не заброшенная стройка? Попробуй найти табличку с улицей.",
        activePerspective: "boy",
        delayMs: 2200,
        nextStepId: "d3_girl_reply_m2"
      },
      d3_girl_reply_m2: {
        id: "d3_girl_reply_m2",
        sender: "girl",
        text: "Или хотя бы номер дома на фасаде. Я попробую поискать этот район по спутниковым картам.",
        activePerspective: "boy",
        delayMs: 2000,
        nextStepId: "d3_boy_choice"
      },
      d3_boy_choice: {
        id: "d3_boy_choice",
        sender: "boy",
        text: "",
        activePerspective: "boy",
        choices: [
          {
            id: "c3_sign",
            label: "Таблички стерты... буквы плывут как дым.",
            messageText: "Таблички есть, но металл разъеден, а буквы расплываются, как только я пытаюсь на них сфокусироваться.",
            statImpact: { affection: 6 },
            nextStepId: "d3_boy_end_burst"
          },
          {
            id: "c3_scared",
            label: "Мне страшно. Но когда ты пишешь, мрак отступает.",
            messageText: "Знаешь, мне по-настоящему страшно. Но когда экран загорается твоими словами, этот туман будто рассеивается вокруг меня.",
            statImpact: { affection: 12, dependence: 6 },
            nextStepId: "d3_boy_end_burst"
          }
        ]
      },
      d3_boy_end_burst: {
        id: "d3_boy_end_burst",
        sender: "boy",
        text: "Я спустился на первый этаж и прислонился к стене. Пока экран светится, холод не пробирает до костей.",
        activePerspective: "boy",
        delayMs: 2400,
        nextStepId: "d3_end"
      },
      d3_end: {
        id: "d3_end",
        sender: "girl",
        text: "Я рядом, Марк. Мы обязательно разберемся, что с этим местом. Я не оставлю тебя одного в этой темноте.",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Наступает глубокая ночь. Два одиночества связывает тонкий провод пикселей..."
        }
      }
    }
  },

  // ==========================================
  // ДЕНЬ 8: Хтоническое существо в тумане
  // ==========================================
  {
    dayNumber: 8,
    title: "День 8: Дыхание в темноте",
    subtitle: "03:12 — Шепот за стеной и тяжелые шаги",
    initialPerspective: "boy",
    startingStepId: "d8_stalker_alert",
    steps: {
      d8_stalker_alert: {
        id: "d8_stalker_alert",
        sender: "boy",
        text: "ТИХО. Алиса, оно здесь. В тумане прямо перед домом что-то движется.",
        activePerspective: "boy",
        glitchEffect: true,
        delayMs: 2000,
        nextStepId: "d8_stalker_alert_m2",
        thoughts: [
          {
            id: "tb_d8_1",
            text: "Оно идет на звук моих шагов... Сердце колотится где-то в горле.",
            character: "boy",
            category: "fear"
          }
        ]
      },
      d8_stalker_alert_m2: {
        id: "d8_stalker_alert_m2",
        sender: "boy",
        text: "Огромное, как смоляная бесформенная тень с десятками вытянутых суставов. Оно скребет железными когтями по асфальту!",
        activePerspective: "boy",
        glitchEffect: true,
        delayMs: 2400,
        nextStepId: "d8_stalker_alert_m3"
      },
      d8_stalker_alert_m3: {
        id: "d8_stalker_alert_m3",
        sender: "boy",
        text: "Оно только что повернуло морду без глаз в сторону моего укрытия...",
        activePerspective: "boy",
        delayMs: 2000,
        nextStepId: "d8_girl_panic"
      },
      d8_girl_panic: {
        id: "d8_girl_panic",
        sender: "girl",
        text: "Боже, Марк! Прячься немедленно! Не двигайся!",
        activePerspective: "girl",
        triggersPerspectiveSwitch: "girl",
        delayMs: 1400,
        nextStepId: "d8_girl_panic_m2"
      },
      d8_girl_panic_m2: {
        id: "d8_girl_panic_m2",
        sender: "girl",
        text: "Где ты сейчас?! В каком помещении?!",
        activePerspective: "girl",
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
            id: "c8_hide_shop",
            label: "Нырни в разбитую витрину магазина и задержи дыхание!",
            messageText: "Залезай в разбитую витрину слева! Прижмись к полу и выключи звук на телефоне!",
            statImpact: { courage: 8, affection: 8 },
            nextStepId: "d8_stealth_result_good"
          },
          {
            id: "c8_run_blind",
            label: "Беги со всех ног по лестнице вверх!",
            messageText: "Беги наверх! Не останавливайся, ищи любую железную дверь!",
            statImpact: { dependence: 6 },
            nextStepId: "d8_stealth_result_scare"
          }
        ]
      },
      d8_stealth_result_good: {
        id: "d8_stealth_result_good",
        sender: "boy",
        text: "Я спрятался за опрокинутым прилавком... Тень проползла в полуметре от меня.",
        activePerspective: "boy",
        delayMs: 2200,
        nextStepId: "d8_stealth_good_m2"
      },
      d8_stealth_good_m2: {
        id: "d8_stealth_good_m2",
        sender: "boy",
        text: "От нее разит сырой могильной землей и озоном. Алиса, твоя подсказка спасла мне жизнь.",
        activePerspective: "boy",
        delayMs: 2400,
        nextStepId: "d8_end"
      },
      d8_stealth_result_scare: {
        id: "d8_stealth_result_scare",
        sender: "boy",
        text: "Едва успел захлопнуть ржавую створку! Тварь ударила в металл так, что посыпалась бетонная крошка.",
        activePerspective: "boy",
        delayMs: 2400,
        nextStepId: "d8_stealth_scare_m2"
      },
      d8_stealth_scare_m2: {
        id: "d8_stealth_scare_m2",
        sender: "boy",
        text: "Оно издало протяжный вибрирующий вой и медленно растворилось в тумане улицы.",
        activePerspective: "boy",
        delayMs: 2200,
        nextStepId: "d8_end"
      },
      d8_end: {
        id: "d8_end",
        sender: "girl",
        text: "У меня руки до сих пор дрожат... Марк, это не просто заброшенный город. Это какое-то чистилище или кошмар наяву.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d8_end_m2"
      },
      d8_end_m2: {
        id: "d8_end_m2",
        sender: "girl",
        text: "Пожалуйста, держись. Я буду сидеть с включенным экраном, пока ты не уснешь.",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Туман за окном Марка медленно смыкается над следами чудовища..."
        }
      }
    }
  },

  // ==========================================
  // ДЕНЬ 14: Буллинг и откровения Алисы
  // ==========================================
  {
    dayNumber: 14,
    title: "День 14: Предел прочности",
    subtitle: "18:40 — Запертый туалет в университете",
    initialPerspective: "girl",
    startingStepId: "d14_girl_cry",
    steps: {
      d14_girl_cry: {
        id: "d14_girl_cry",
        sender: "girl",
        text: "Марк... Я больше не могу. Они сняли меня на видео в столовой, смонтировали с мерзкими оскорблениями и выложили в студенческий паблик.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d14_girl_cry_m2",
        thoughts: [
          {
            id: "t_d14_1",
            text: "Я хочу просто исчезнуть. Чтобы этот мир выключился, как сломанный монитор.",
            character: "girl",
            category: "trauma"
          },
          {
            id: "t_d14_2",
            text: "Марк — единственный, кто говорит со мной как с человеком.",
            character: "girl",
            category: "hope"
          }
        ]
      },
      d14_girl_cry_m2: {
        id: "d14_girl_cry_m2",
        sender: "girl",
        text: "Все тычут пальцами и смеются, когда я прохожу по коридору. Я заперлась в кабинке и сижу на полу.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d14_boy_support"
      },
      d14_boy_support: {
        id: "d14_boy_support",
        sender: "boy",
        text: "Алиса, послушай меня. Посмотри в экран. Ты слышишь меня?! Ни одно их слово не имеет веса.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d14_boy_support_m2"
      },
      d14_boy_support_m2: {
        id: "d14_boy_support_m2",
        sender: "boy",
        text: "Они жалкие трусы, сбивающиеся в стаю от собственной внутренней пустоты.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d14_boy_support_m3"
      },
      d14_boy_support_m3: {
        id: "d14_boy_support_m3",
        sender: "boy",
        text: "Ты в тысячу раз глубже, чище и сильнее каждого из них. Я не дам тебе сломаться.",
        activePerspective: "girl",
        delayMs: 2200,
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
            label: "Ты прав. Я не сдамся им на радость.",
            messageText: "Спасибо... Мне было нужно это услышать. Я умою лицо, соберу конспекты и выйду с высоко поднятой головой.",
            statImpact: { courage: 12, affection: 10 },
            nextStepId: "d14_boy_proud"
          },
          {
            id: "c14_escape",
            label: "Забери меня к себе в туман. Мне никто не нужен кроме тебя.",
            messageText: "Марк, найди способ забрать меня в свой город. Я хочу уйти отсюда. Мне плевать на этот мир, если в нем есть ты.",
            statImpact: { dependence: 15, affection: 8 },
            nextStepId: "d14_boy_worry"
          }
        ]
      },
      d14_boy_proud: {
        id: "d14_boy_proud",
        sender: "boy",
        text: "Вот это моя смелая Алиса. Я горжусь тобой больше всего на свете.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d14_boy_proud_m2"
      },
      d14_boy_proud_m2: {
        id: "d14_boy_proud_m2",
        sender: "boy",
        text: "Я мысленно держу тебя за руку в этом коридоре. Ничего не бойся.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d14_end"
      },
      d14_boy_worry: {
        id: "d14_boy_worry",
        sender: "boy",
        text: "Не говори так, прошу тебя... Здесь страшно, пусто и холодно.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d14_boy_worry_m2"
      },
      d14_boy_worry_m2: {
        id: "d14_boy_worry_m2",
        sender: "boy",
        text: "Ты должна жить, видеть солнце, чувствовать тепло. Я не допущу, чтобы ты оказалась в этой тьме.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d14_end"
      },
      d14_end: {
        id: "d14_end",
        sender: "girl",
        text: "Я выхожу из кабинки. До вечера, Марк. Спасибо, что ты есть.",
        activePerspective: "girl",
        triggersWait: {
          type: "offline_activity",
          durationSeconds: 7200,
          description: "Алиса справляется с панической атакой и возвращается в аудиторию..."
        }
      }
    }
  },

  // ==========================================
  // ДЕНЬ 19: Квартира родителей и рюкзак
  // ==========================================
  {
    dayNumber: 19,
    title: "День 19: Дверь номер 42 и синий рюкзак",
    subtitle: "01:20 — Находка в мертвом квартале",
    initialPerspective: "boy",
    startingStepId: "d19_boy_flat",
    steps: {
      d19_boy_flat: {
        id: "d19_boy_flat",
        sender: "boy",
        text: "Алиса... У меня кружится голова. Я набрел на панельный дом. Поднялся на третий этаж... и тут моя дверь.",
        activePerspective: "boy",
        delayMs: 2200,
        nextStepId: "d19_boy_flat_m2",
        thoughts: [
          {
            id: "tb_d19_1",
            text: "Внутри пыльно и тихо... На вешалке мамина старая куртка.",
            character: "boy",
            category: "memory"
          },
          {
            id: "tb_d19_2",
            text: "В углу комнаты... мой синий альпинистский рюкзак и связка карабинов.",
            character: "boy",
            category: "clue"
          }
        ]
      },
      d19_boy_flat_m2: {
        id: "d19_boy_flat_m2",
        sender: "boy",
        text: "Номер 42. Медная царапина возле замка, которую я сам оставил ключом три года назад.",
        activePerspective: "boy",
        delayMs: 2000,
        nextStepId: "d19_boy_flat_m3"
      },
      d19_boy_flat_m3: {
        id: "d19_boy_flat_m3",
        sender: "boy",
        text: "Дверь была не заперта. Я вошел внутрь. Здесь пахнет маминым травяным чаем и пылью.",
        activePerspective: "boy",
        delayMs: 2200,
        nextStepId: "d19_boy_memory_reveal"
      },
      d19_boy_memory_reveal: {
        id: "d19_boy_memory_reveal",
        sender: "boy",
        text: "Я подошел к рюкзаку. На нем следы засохшей грязи и снега. И тут меня накрыло... Скалы. Северный хребет. Оборвавшийся страховочный трос.",
        activePerspective: "boy",
        glitchEffect: true,
        delayMs: 2600,
        nextStepId: "d19_boy_memory_m2"
      },
      d19_boy_memory_m2: {
        id: "d19_boy_memory_m2",
        sender: "boy",
        text: "Свист ледяного ветра и страшный удар о камни в пропасти... Я всё вспомнил.",
        activePerspective: "boy",
        glitchEffect: true,
        delayMs: 2400,
        nextStepId: "d19_switch_girl"
      },
      d19_switch_girl: {
        id: "d19_switch_girl",
        sender: "system",
        text: "[СМЕНА ПЕРСПЕКТИВЫ: ОСОЗНАНИЕ]",
        activePerspective: "girl",
        triggersPerspectiveSwitch: "girl",
        thoughts: [
          {
            id: "t_d19_1",
            text: "Падение со скалы?.. Марк... ты... нет, это не может быть правдой!",
            character: "girl",
            category: "fear"
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
            id: "c19_truth",
            label: "Марк... ты помнишь, когда это случилось?",
            messageText: "Марк... ответь мне честно. Ты помнишь, в каком году был этот поход в горы?",
            statImpact: { affection: 10, courage: 8 },
            nextStepId: "d19_boy_epiphany"
          },
          {
            id: "c19_deny",
            label: "Это просто галлюцинация от усталости! Не верь этому!",
            messageText: "Не думай об этом! Это просто дурной сон от тумана, ты жив, мы найдем тебя!",
            statImpact: { dependence: 12, affection: 6 },
            nextStepId: "d19_boy_epiphany"
          }
        ]
      },
      d19_boy_epiphany: {
        id: "d19_boy_epiphany",
        sender: "boy",
        text: "Это было два года назад... Я вспомнил свои похороны. Я видел маму в черном платке сквозь толщу сырой земли.",
        activePerspective: "girl",
        delayMs: 2800,
        nextStepId: "d19_boy_epiphany_m2"
      },
      d19_boy_epiphany_m2: {
        id: "d19_boy_epiphany_m2",
        sender: "boy",
        text: "Алиса... Я мертв. Я всё это время был призраком, застрявшим между мирами.",
        activePerspective: "girl",
        delayMs: 2600,
        nextStepId: "d19_end"
      },
      d19_end: {
        id: "d19_end",
        sender: "girl",
        text: "Марк... Даже если ты призрак... для меня ты живее всех людей в этом проклятом городе.",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Осознание смерти оставляет ледяной штиль в обоих мирах..."
        }
      }
    }
  },

  // ==========================================
  // ДЕНЬ 25: Сущность и подозрения
  // ==========================================
  {
    dayNumber: 25,
    title: "День 25: Символы на зеркале",
    subtitle: "23:05 — Искажение голоса и странные лакуны",
    initialPerspective: "girl",
    startingStepId: "d25_clue",
    steps: {
      d25_clue: {
        id: "d25_clue",
        sender: "boy",
        text: "Алиса, иногда мне кажется, что этот туман зовет меня твоим голосом.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d25_clue_m2",
        thoughts: [
          {
            id: "t_d25_1",
            text: "Его стиль письма... на секунду изменился. Будто сквозь Марка пробивается чужой, холодный и ненасытный шёпот.",
            character: "girl",
            category: "clue"
          }
        ]
      },
      d25_clue_m2: {
        id: "d25_clue_m2",
        sender: "boy",
        text: "Он шепчет, что если ты навсегда закроешься от людей в своей комнате, никто больше не причинит тебе боли.",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d25_clue_m3"
      },
      d25_clue_m3: {
        id: "d25_clue_m3",
        sender: "boy",
        text: "Ты ведь хочешь этого?.. Просто остаться со мной в тишине и никогда не выходить наружу.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d25_girl_choice"
      },
      d25_girl_choice: {
        id: "d25_girl_choice",
        sender: "girl",
        text: "",
        activePerspective: "girl",
        choices: [
          {
            id: "c25_entity_check",
            label: "Марк, назови нашу первую фразу из 1 дня!",
            messageText: "Марк, стой. Какая была самая первая вещь, о которой я тебе написала в первый день?",
            statImpact: { courage: 10, affection: 6 },
            nextStepId: "d25_boy_glitch_reply"
          },
          {
            id: "c25_blind_trust",
            label: "Да... Я хочу быть с тобой навсегда, Марк.",
            messageText: "Да, Марк. Я устала бороться одна. Если ты позовешь — мне больше никто не нужен.",
            statImpact: { dependence: 20, entityInfluence: 25 },
            nextStepId: "d25_boy_gentle_reply"
          }
        ]
      },
      d25_boy_glitch_reply: {
        id: "d25_boy_glitch_reply",
        sender: "boy",
        text: "...Ты спросила, не розыгрыш ли это от одногруппников. Прости, Алиса! На мгновение на меня нахлынул дурман...",
        activePerspective: "girl",
        delayMs: 2400,
        nextStepId: "d25_boy_glitch_m2"
      },
      d25_boy_glitch_m2: {
        id: "d25_boy_glitch_m2",
        sender: "boy",
        text: "Эта тварь из тумана пытается говорить через мой мессенджер! Она питается твоим одиночеством!",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d25_end"
      },
      d25_boy_gentle_reply: {
        id: "d25_boy_gentle_reply",
        sender: "boy",
        text: "Скоро... 33-й день станет нашим переходом. Больше никакой боли, Алиса.",
        activePerspective: "girl",
        delayMs: 2200,
        nextStepId: "d25_boy_gentle_m2"
      },
      d25_boy_gentle_m2: {
        id: "d25_boy_gentle_m2",
        sender: "boy",
        text: "Запрись от всех и будь только со мной. Навсегда.",
        activePerspective: "girl",
        delayMs: 2000,
        nextStepId: "d25_end"
      },
      d25_end: {
        id: "d25_end",
        sender: "system",
        text: "Канал связи дрожит от интерференции. До финала 33-дневного цикла осталось несколько дней.",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Грань между мирами истончается до предела..."
        }
      }
    }
  },

  // ==========================================
  // ДЕНЬ 32: Накануне великого выбора
  // ==========================================
  {
    dayNumber: 32,
    title: "День 32: Последний закат без солнца",
    subtitle: "21:00 — Стены города начинают таять",
    initialPerspective: "boy",
    startingStepId: "d32_boy_farewell_prep",
    steps: {
      d32_boy_farewell_prep: {
        id: "d32_boy_farewell_prep",
        sender: "boy",
        text: "Алиса. Завтра 33-й день. Туман вокруг меня стал золотистым... Лестницы перестали уходить в никуда, в небе появился свет. Кажется, время моего перехода пришло.",
        activePerspective: "boy",
        thoughts: [
          {
            id: "tb_d32_1",
            text: "Я люблю её больше собственной незавершенной жизни.",
            character: "boy",
            category: "hope"
          },
          {
            id: "tb_d32_2",
            text: "Сможет ли она жить дальше без моих сообщений?..",
            character: "boy",
            category: "fear"
          }
        ],
        nextStepId: "d32_switch_girl"
      },
      d32_switch_girl: {
        id: "d32_switch_girl",
        sender: "system",
        text: "[СМЕНА ПЕРСПЕКТИВЫ: РЕШАЮЩАЯ НОЧЬ]",
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
            id: "c32_accept",
            label: "Ты заслужил покой, Марк. Я научусь быть сильной ради тебя.",
            messageText: "Марк... Мое сердце разрывается, но ты должен идти к свету. Благодаря тебе я поняла, что достойна жизни и уважения. Я справлюсь.",
            statImpact: { courage: 25, affection: 15 },
            nextStepId: "d32_end"
          },
          {
            id: "c32_clasp",
            label: "Не уходи! Без тебя я здесь погибну!",
            messageText: "Нет! Не смей уходить! Если ты уйдешь, этот мир меня раздавит! Останься со мной в этом мессенджере навсегда!",
            statImpact: { dependence: 30, courage: -15 },
            nextStepId: "d32_end"
          },
          {
            id: "c32_fake_smile",
            label: "[Скрыть отчаяние] Конечно, уходи, у меня всё отлично...",
            messageText: "Конечно, Марк... Иди. У меня в универе всё наладилось, не волнуйся за меня. Я буду в полном порядке.",
            statImpact: { dependence: 10, courage: 0 },
            nextStepId: "d32_end"
          }
        ]
      },
      d32_end: {
        id: "d32_end",
        sender: "boy",
        text: "Завтра в полночь мы скажем главное. Береги себя, моя Алиса.",
        activePerspective: "girl",
        triggersWait: {
          type: "day_end",
          durationSeconds: 25200,
          description: "Наступает 33-й день — кульминация переписки..."
        }
      }
    }
  },

  // ==========================================
  // ДЕНЬ 33: КУЛЬМИНАЦИЯ И КОНЦОВКИ
  // ==========================================
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
        text: "[ФИНАЛЬНЫЙ ДЕНЬ 33: ВЫЧИСЛЕНИЕ СУДЬБЫ ГЕРОЕВ]",
        activePerspective: "girl",
        thoughts: [
          {
            id: "t_d33_1",
            text: "33-й день. На часах 23:59. Сейчас решится всё.",
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
            label: "Путь Преодоления: Отпустить с благодарностью и жить в реальности",
            messageText: "Марк... Спасибо за то, что спас мою душу от тьмы. Я выстою перед трудностями, найду силы жить дальше и буду помнить тебя. Лети к свету.",
            nextStepId: "d33_ending_1_res"
          },
          {
            id: "c33_branch_2",
            label: "Путь Вечной Изоляции: Закрыться от мира и остаться в чате",
            messageText: "Я заперла дверь на засов и задернула шторы. Мне плевать на универ, на общество, на весь этот жестокий мир. Моя реальность — только ты. Мы останемся на связи навсегда.",
            nextStepId: "d33_ending_2_res"
          },
          {
            id: "c33_branch_3",
            label: "Путь Фатального Прощания: Скрыть отчаяние и шагнуть за край",
            messageText: "Прощай, Марк. Ты свободен... (Алиса кладет телефон и поднимается на крышу высотки, не видя смысла жить без него).",
            nextStepId: "d33_ending_3_res"
          }
        ]
      },

      // Ending 1: Overcoming & Peace
      d33_ending_1_res: {
        id: "d33_ending_1_res",
        sender: "boy",
        text: "Алиса... Твоя сила прекрасна. Я вижу рассвет. Чудовище растворилось в лучах утреннего солнца. Я свободен... и ты свободна. Живи счастливо.",
        activePerspective: "girl",
        delayMs: 2500,
        triggersEnding: "ending_1_overcoming"
      },

      // Ending 2: Eternal Limbo / Parasitic Entity Connection
      d33_ending_2_res: {
        id: "d33_ending_2_res",
        sender: "boy",
        text: "Дверь заперта... Ты сделала правильный выбор, Алиса. Внешний мир слишком груб для тебя. Мы останемся здесь вдвоем... [В углах темной комнаты сгущается липкий холод, а из экрана тихо сочится незримая черная тень, убаюкивая твой разум]",
        activePerspective: "girl",
        delayMs: 2500,
        triggersEnding: "ending_2_eternal_limbo"
      },

      // Ending 3: Resurrection & Race against Time
      d33_ending_3_res: {
        id: "d33_ending_3_res",
        sender: "system",
        text: "[ВСПЫШКА: Марк уходит... но в последний миг чувствует разрыв сердца Алисы. Сила связи пробивает законы небытия. Марк материализуется из тумана прямо на мокрой улице живого города! Он бежит к ее дому сквозь ливень!]",
        activePerspective: "boy",
        triggersPerspectiveSwitch: "boy",
        delayMs: 3000,
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
            label: "Выбить дверь на крышу и поймать ее за руку!",
            messageText: "[МАРК ВЫБИВАЕТ ДВЕРЬ НА КРЫШУ]",
            nextStepId: "d33_ending_3a"
          },
          {
            id: "c33_3b",
            label: "Опоздать на долю секунды...",
            messageText: "[МАРК ВЗБЕГАЕТ НА КРЫШУ СЛИШКОМ ПОЗДНО]",
            nextStepId: "d33_ending_3b"
          },
          {
            id: "c33_3c",
            label: "Остановиться у подъезда под дождем (Открытый финал)",
            messageText: "[МАРК СМОТРИТ НА СВЕТЯЩЕЕСЯ ОКНО В ДОЖДЕ]",
            nextStepId: "d33_ending_3c"
          }
        ]
      },
      d33_ending_3a: {
        id: "d33_ending_3a",
        sender: "boy",
        text: "АЛИСА! Я держу тебя! Я здесь! Я живой, чувствуешь мое тепло?! Я никогда тебя не отпущу!",
        activePerspective: "boy",
        delayMs: 2000,
        triggersEnding: "ending_3a_saved"
      },
      d33_ending_3b: {
        id: "d33_ending_3b",
        sender: "system",
        text: "Только порыв холодного ветра и оставленный на парапете телефон, на котором горит последнее непрочитанное сообщение...",
        activePerspective: "boy",
        delayMs: 2000,
        triggersEnding: "ending_3b_too_late"
      },
      d33_ending_3c: {
        id: "d33_ending_3c",
        sender: "boy",
        text: "Дождь омывает мое живое лицо. Я стою под ее окнами и набираю номер на телефоне. Длинные гудки... затем тихое дыхание в трубке.",
        activePerspective: "boy",
        delayMs: 2000,
        triggersEnding: "ending_3c_open_finale"
      }
    }
  }
];

// Helper to generate dynamic placeholder intermediary days if user jumps or plays days 4-7, 9-13, 15-18, 20-24, 26-31
export function getDayData(dayNumber: number): DayStory {
  const existing = STORY_DAYS.find(d => d.dayNumber === dayNumber);
  if (existing) return existing;

  // Generate procedural atmospheric day for intermediary days
  const isGirlDay = dayNumber % 2 !== 0;
  const isMonsterDay = dayNumber % 5 === 0;

  return {
    dayNumber,
    title: `День ${dayNumber}: ${isMonsterDay ? 'Шорохи в серой дымке' : 'Нити сквозь статику'}`,
    subtitle: isGirlDay ? '22:15 — Комната Алисы, тишина' : '02:17 — Туманный проспект Лимбо',
    initialPerspective: isGirlDay ? 'girl' : 'boy',
    startingStepId: `d${dayNumber}_start`,
    steps: {
      [`d${dayNumber}_start`]: {
        id: `d${dayNumber}_start`,
        sender: isGirlDay ? 'boy' : 'girl',
        text: isGirlDay
          ? `Алиса, ты сегодня как? Я прошел еще несколько кварталов.`
          : `Марк, привет. Сегодня в универе снова было тяжело...`,
        activePerspective: isGirlDay ? 'girl' : 'boy',
        delayMs: 2000,
        nextStepId: `d${dayNumber}_start_m2`,
        thoughts: [
          {
            id: `t_d${dayNumber}_1`,
            text: isGirlDay
              ? 'Каждый день жду его сообщений, как глоток кислорода.'
              : 'Этот туманный город кажется менее жутким, когда она рядом.',
            character: isGirlDay ? 'girl' : 'boy',
            category: isMonsterDay ? 'clue' : 'reflection'
          }
        ]
      },
      [`d${dayNumber}_start_m2`]: {
        id: `d${dayNumber}_start_m2`,
        sender: isGirlDay ? 'boy' : 'girl',
        text: isGirlDay
          ? `Туман сгущается, но экран твоего чата светится так тепло среди этого серого холода.`
          : `Но я вспомнила наши разговоры и нашла в себе силы не опускать глаза. Как ты там?`,
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
            id: `c${dayNumber}_warm`,
            label: 'Поддержать и поделиться теплом',
            messageText: isGirlDay 
              ? 'Я тоже очень скучала. Расскажи мне подробнее, что ты видишь вокруг?'
              : 'Спасибо, Алиса. Твои слова согревают меня даже посреди этого бесконечного тумана.',
            statImpact: { affection: 6, courage: 4 },
            nextStepId: `d${dayNumber}_reply_1`
          },
          {
            id: `c${dayNumber}_deep`,
            label: 'Поговорить о будущем и тайнах этого места',
            messageText: isGirlDay
              ? 'Мы обязательно раскроем тайну этого города и найдем выход в реальность.'
              : 'Я нашел старый указатель на перекрестке. Кажется, мы приближаемся к разгадке.',
            statImpact: { courage: 6, dependence: 4 },
            nextStepId: `d${dayNumber}_reply_1`
          }
        ]
      },
      [`d${dayNumber}_reply_1`]: {
        id: `d${dayNumber}_reply_1`,
        sender: isGirlDay ? 'boy' : 'girl',
        text: isGirlDay
          ? 'Здесь дома будто слеплены из старых фотоплёнок. Но главное — мы держим связь.'
          : 'Каждый прожитый день делает нас ближе к правде.',
        activePerspective: isGirlDay ? 'girl' : 'boy',
        delayMs: 2200,
        nextStepId: `d${dayNumber}_reply_2`
      },
      [`d${dayNumber}_reply_2`]: {
        id: `d${dayNumber}_reply_2`,
        sender: isGirlDay ? 'boy' : 'girl',
        text: isGirlDay
          ? 'Спасибо тебе за всё. Отдыхай и набирайся сил, Алиса. Я буду на связи.'
          : 'Береги себя в тумане, Марк. До завтра.',
        activePerspective: isGirlDay ? 'girl' : 'boy',
        delayMs: 2000,
        triggersWait: {
          type: 'day_end',
          durationSeconds: 25200,
          description: `День ${dayNumber} подходит к концу. Переписка продолжается...`
        }
      }
    }
  };
}
