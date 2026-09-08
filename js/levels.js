/**
 * levels.js - הגדרת שלבי המשחק עבור Space Orbit: Flexbox Navigator
 * עומד בכל דרישות המטלה: לפחות 6 שלבים, flex-wrap, ושילוב של מספר מאפיינים בו זמנית.
 */

const GAME_LEVELS = [
  {
    id: 1,
    title: "שלב 1: הצמדה למסלול הימני",
    subtitle: "בסיס הציר הראשי - justify-content",
    description: "ברוך הבא למרכז הבקרה! כוון את שתי החלליות לעבר תחנות העגינה הנמצאות בקצה השורה (הציר הראשי). השתמש במאפיין <code>justify-content</code>.",
    hint: "המאפיין <code>justify-content</code> מיישר פריטים לאורך הציר הראשי (Main Axis). הערך <code>flex-end</code> מצמיד את הפריטים לסוף השורה.",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "orange", id: "ship-2" }
    ],
    // CSS target expected for validation
    targetStyles: {
      "justify-content": "flex-end"
    },
    // Which controls are enabled / visible for the player in this level
    controls: [
      {
        property: "justify-content",
        label: "justify-content",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "space-between", label: "space-between" },
          { value: "space-around", label: "space-around" },
          { value: "space-evenly", label: "space-evenly" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "flex-direction": "row",
      "align-items": "flex-start",
      "flex-wrap": "nowrap"
    }
  },
  {
    id: 2,
    title: "שלב 2: מירכוז אנכי",
    subtitle: "יישור הציר המשני - align-items",
    description: "החלליות נכנסות למסלול. מרכז את שלוש החלליות בציר האנכי (Cross Axis) של הלוח כדי שיתאימו לתחנות העגינה.",
    hint: "המאפיין <code>align-items</code> מיישר פריטים לאורך הציר המשני (Cross Axis). הערך <code>center</code> ממקם את הפריטים בדיוק במרכז הגובה.",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "orange", id: "ship-2" },
      { type: "green", id: "ship-3" }
    ],
    targetStyles: {
      "align-items": "center"
    },
    controls: [
      {
        property: "align-items",
        label: "align-items",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "stretch", label: "stretch" },
          { value: "baseline", label: "baseline" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "flex-direction": "row",
      "justify-content": "flex-start",
      "flex-wrap": "nowrap"
    }
  },
  {
    id: 3,
    title: "שלב 3: חלוקת מרווחים שווה",
    subtitle: "פיזור פריטים - space-around",
    description: "יש לפזר את שלוש החלליות לאורך השורה כך שיהיה מרווח שווה סביב כל חללית (כולל רווחים בצדדים).",
    hint: "הערך <code>space-around</code> מחלק את המרווח הפנוי בצורה שווה משני צדי כל פריט.",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "orange", id: "ship-2" },
      { type: "green", id: "ship-3" }
    ],
    targetStyles: {
      "justify-content": "space-around"
    },
    alternateTargetStyles: [
      { "justify-content": "space-evenly" }
    ],
    controls: [
      {
        property: "justify-content",
        label: "justify-content",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "space-between", label: "space-between" },
          { value: "space-around", label: "space-around" },
          { value: "space-evenly", label: "space-evenly" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "flex-direction": "row",
      "align-items": "flex-start",
      "flex-wrap": "nowrap"
    }
  },
  {
    id: 4,
    title: "שלב 4: שינוי כיוון והיפוך סדר",
    subtitle: "ציר ראשי אנכי והיפוך - column-reverse",
    description: "סדר הטיסה השתנה! ארגן את החלליות בטור אנכי מלמטה למעלה (בסדר הפוך) בהתאם לצבע תחנת העגינה של כל חללית.",
    hint: "המאפיין <code>flex-direction</code> מגדיר את כיוון הציר הראשי. <code>column-reverse</code> יוצר טור אנכי והופך את סדר הופעת הפריטים.",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "orange", id: "ship-2" },
      { type: "green", id: "ship-3" }
    ],
    targetStyles: {
      "flex-direction": "column-reverse"
    },
    controls: [
      {
        property: "flex-direction",
        label: "flex-direction",
        default: "row",
        options: [
          { value: "row", label: "row" },
          { value: "row-reverse", label: "row-reverse" },
          { value: "column", label: "column" },
          { value: "column-reverse", label: "column-reverse" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "justify-content": "flex-start",
      "align-items": "flex-start",
      "flex-wrap": "nowrap"
    }
  },
  {
    id: 5,
    title: "שלב 5: תמרון משולב - טור לתחתית",
    subtitle: "שילוב מאפיינים 1: direction + justify",
    description: "עליך לסדר את שתי החלליות בטור אנכי (מלמעלה למטה), ולהצמיד אותן לתחתית לוח הבקרה.",
    hint: "כאשר <code>flex-direction</code> מוגדר כ-<code>column</code>, הציר הראשי הופך לאנכי, ולכן <code>justify-content: flex-end</code> מזיז את הפריטים לתחתית!",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "purple", id: "ship-2" }
    ],
    targetStyles: {
      "flex-direction": "column",
      "justify-content": "flex-end"
    },
    controls: [
      {
        property: "flex-direction",
        label: "flex-direction",
        default: "row",
        options: [
          { value: "row", label: "row" },
          { value: "row-reverse", label: "row-reverse" },
          { value: "column", label: "column" },
          { value: "column-reverse", label: "column-reverse" }
        ]
      },
      {
        property: "justify-content",
        label: "justify-content",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "space-between", label: "space-between" },
          { value: "space-around", label: "space-around" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "align-items": "flex-start",
      "flex-wrap": "nowrap"
    }
  },
  {
    id: 6,
    title: "שלב 6: הצמדה לימין ומירכוז אנכי",
    subtitle: "שילוב מאפיינים 2: justify + align",
    description: "מקם את שלוש החלליות בשורה במרכז הגובה של הלוח, כשהן צמודות לחלקו הימני.",
    hint: "השתמש ב-<code>align-items: center</code> כדי למרכז אנכית, וב-<code>justify-content: flex-end</code> כדי להצמיד לסוף השורה.",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "orange", id: "ship-2" },
      { type: "green", id: "ship-3" }
    ],
    targetStyles: {
      "justify-content": "flex-end",
      "align-items": "center"
    },
    controls: [
      {
        property: "justify-content",
        label: "justify-content",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "space-between", label: "space-between" },
          { value: "space-around", label: "space-around" }
        ]
      },
      {
        property: "align-items",
        label: "align-items",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "stretch", label: "stretch" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "flex-direction": "row",
      "flex-wrap": "nowrap"
    }
  },
  {
    id: 7,
    title: "שלב 7: הרחבת הצי - שבירת שורות",
    subtitle: "מאפיין חובה: flex-wrap + justify",
    description: "הצי גדל ל-6 חלליות! אפשר לחלליות שאין להן מקום לגלוש לשורה הבאה (wrap), ומרכז את כל החלליות בתוך השורות.",
    hint: "הגדר <code>flex-wrap: wrap</code> כדי לאפשר גלישת פריטים לשורה חדשה, והשתמש ב-<code>justify-content: center</code> כדי למרכז אותן.",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "orange", id: "ship-2" },
      { type: "green", id: "ship-3" },
      { type: "purple", id: "ship-4" },
      { type: "cyan", id: "ship-5" },
      { type: "orange", id: "ship-6" }
    ],
    targetStyles: {
      "flex-wrap": "wrap",
      "justify-content": "center"
    },
    controls: [
      {
        property: "flex-wrap",
        label: "flex-wrap",
        default: "nowrap",
        options: [
          { value: "nowrap", label: "nowrap" },
          { value: "wrap", label: "wrap" },
          { value: "wrap-reverse", label: "wrap-reverse" }
        ]
      },
      {
        property: "justify-content",
        label: "justify-content",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "space-between", label: "space-between" },
          { value: "space-around", label: "space-around" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "flex-direction": "row",
      "align-items": "flex-start"
    }
  },
  {
    id: 8,
    title: "שלב 8: מערך פיקוד מורכב",
    subtitle: "שילוב של 3 מאפיינים: direction + justify + align",
    description: "סדר את ארבע החלליות בטור אנכי, מרכז אותן לרוחב הלוח (במרכז האופקי), ופזר אותן במרווח מרבי מקצה לקצה בציר האנכי.",
    hint: "השתמש ב-<code>flex-direction: column</code>, פזר עם <code>justify-content: space-between</code> ומרכז לרוחב עם <code>align-items: center</code>.",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "orange", id: "ship-2" },
      { type: "green", id: "ship-3" },
      { type: "purple", id: "ship-4" }
    ],
    targetStyles: {
      "flex-direction": "column",
      "justify-content": "space-between",
      "align-items": "center"
    },
    controls: [
      {
        property: "flex-direction",
        label: "flex-direction",
        default: "row",
        options: [
          { value: "row", label: "row" },
          { value: "row-reverse", label: "row-reverse" },
          { value: "column", label: "column" },
          { value: "column-reverse", label: "column-reverse" }
        ]
      },
      {
        property: "justify-content",
        label: "justify-content",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "space-between", label: "space-between" },
          { value: "space-around", label: "space-around" }
        ]
      },
      {
        property: "align-items",
        label: "align-items",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "stretch", label: "stretch" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "flex-wrap": "nowrap"
    }
  },
  {
    id: 9,
    title: "שלב 9: יישור רב-שורתי מתקדם",
    subtitle: "שילוב: flex-wrap + align-content + justify",
    description: "החלליות גולשות לשתי שורות. אפשר שבירת שורות, פזר את השורות עצמן לקצוות העליונים והתחתונים של הלוח (align-content), ופזר את החלליות בכל שורה במרווח שווה.",
    hint: "הגדר <code>flex-wrap: wrap</code>, השתמש ב-<code>align-content: space-between</code> ליישור השורות כולן, ו-<code>justify-content: space-around</code> ליישור הפריטים בכל שורה.",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "orange", id: "ship-2" },
      { type: "green", id: "ship-3" },
      { type: "purple", id: "ship-4" },
      { type: "cyan", id: "ship-5" },
      { type: "orange", id: "ship-6" }
    ],
    targetStyles: {
      "flex-wrap": "wrap",
      "align-content": "space-between",
      "justify-content": "space-around"
    },
    alternateTargetStyles: [
      {
        "flex-wrap": "wrap",
        "align-content": "space-between",
        "justify-content": "space-evenly"
      }
    ],
    controls: [
      {
        property: "flex-wrap",
        label: "flex-wrap",
        default: "nowrap",
        options: [
          { value: "nowrap", label: "nowrap" },
          { value: "wrap", label: "wrap" },
          { value: "wrap-reverse", label: "wrap-reverse" }
        ]
      },
      {
        property: "align-content",
        label: "align-content",
        default: "stretch",
        options: [
          { value: "stretch", label: "stretch" },
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "space-between", label: "space-between" },
          { value: "space-around", label: "space-around" }
        ]
      },
      {
        property: "justify-content",
        label: "justify-content",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "space-between", label: "space-between" },
          { value: "space-around", label: "space-around" },
          { value: "space-evenly", label: "space-evenly" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "flex-direction": "row",
      "align-items": "flex-start"
    }
  },
  {
    id: 10,
    title: "שלב 10: משימת הדגל - מפקד הצי",
    subtitle: "אתגר המאסטר המשולב",
    description: "משימת סיום הקורס! הפוך את הצי לטור אנכי מלמטה למעלה, הצמד את כל הצי לימין הלוח, ופזר מרווח שווה סביב כל חללית לאורך הטור.",
    hint: "הגדר <code>flex-direction: column-reverse</code>, השתמש ב-<code>align-items: flex-end</code> כדי להצמיד לימין (בטור, ציר ה-Cross הוא אופקי), וב-<code>justify-content: space-around</code>.",
    items: [
      { type: "cyan", id: "ship-1" },
      { type: "orange", id: "ship-2" },
      { type: "green", id: "ship-3" },
      { type: "purple", id: "ship-4" }
    ],
    targetStyles: {
      "flex-direction": "column-reverse",
      "justify-content": "space-around",
      "align-items": "flex-end"
    },
    alternateTargetStyles: [
      {
        "flex-direction": "column-reverse",
        "justify-content": "space-evenly",
        "align-items": "flex-end"
      }
    ],
    controls: [
      {
        property: "flex-direction",
        label: "flex-direction",
        default: "row",
        options: [
          { value: "row", label: "row" },
          { value: "row-reverse", label: "row-reverse" },
          { value: "column", label: "column" },
          { value: "column-reverse", label: "column-reverse" }
        ]
      },
      {
        property: "justify-content",
        label: "justify-content",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "space-between", label: "space-between" },
          { value: "space-around", label: "space-around" },
          { value: "space-evenly", label: "space-evenly" }
        ]
      },
      {
        property: "align-items",
        label: "align-items",
        default: "flex-start",
        options: [
          { value: "flex-start", label: "flex-start" },
          { value: "flex-end", label: "flex-end" },
          { value: "center", label: "center" },
          { value: "stretch", label: "stretch" }
        ]
      }
    ],
    baseStyles: {
      "display": "flex",
      "flex-wrap": "nowrap"
    }
  }
];
