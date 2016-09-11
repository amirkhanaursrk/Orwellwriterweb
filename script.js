function create(e) {
    if (New = tinyMCE.activeEditor.getContent({
            format: "text"
        }), 32 == e.keyCode) {
        console.log(typeof New), console.log(New), New = New.trim();
        var t = New.split(" ").splice(-1);
        synonyms(t), adjectives(t), prewords(t)
    }
}

function synonyms(e) {
    $.get("https://api.datamuse.com/words?ml=" + e, function(t) {
        console.log(e, t), fireout(t, "#divID")
    })
}

function adjectives(e) {
    $.get("https://api.datamuse.com/words?rel_jjb=" + e, function(t) {
        console.log(e, t), fireout(t, "#divID1")
    })
}

function prewords(e) {
    $.get("https://api.datamuse.com/words?rel_bgb=" + e, function(t) {
        console.log(e, t), fireout(t, "#divID3")
    })
}

function fireout(e, t) {
    var n, o = "";
    for (n = 0; n < e.length; n++) o += e[n].word + " ";
    $(t).html(o)
}

function doit() {
    var e = "en-US";
    tinyMCE.activeEditor.execCommand("mceWritingImprovementTool", e)
}

function download(e, t) {
    var n = document.createElement("a");
    if (n.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(t)), n.setAttribute("download", e), document.createEvent) {
        var o = document.createEvent("MouseEvents");
        o.initEvent("click", !0, !0), n.dispatchEvent(o)
    } else n.click()
}

function search() {
    var e = document.getElementById("navbarInput-01").value;
    $.get("https://api.datamuse.com/words?topics=" + e, function(e) {
        fireout1(e, "#return-search")
    })
}

function fireout1(e, t) {
    var n, o = "";
    for (n = 0; 11 > n; n++) o += e[n].word + " ";
    $(t).html("<strong>Topics that you searched: </strong>" + o)
}
var Old = "",
    New = "";
tinyMCE.init({
    mode: "textareas",
    body_id: "text1111",
    plugins: "AtD, paste",
    paste_text_sticky: !0,
    setup: function(e) {
        e.onInit.add(function(e) {
            e.pasteAsPlainText = !0
        }), e.onKeyUp.add(function(e, t) {
            create(t)
        })
    },
    languagetool_i18n_no_errors: {
        "de-DE": "Keine Fehler gefunden."
    },
    languagetool_i18n_explain: {
        "de-DE": "Mehr Informationen..."
    },
    languagetool_i18n_ignore_once: {
        "de-DE": "Hier ignorieren"
    },
    languagetool_i18n_ignore_all: {
        "de-DE": "Fehler dieses Typs ignorieren"
    },
    languagetool_i18n_rule_implementation: {
        "de-DE": "Implementierung der Regel"
    },
    languagetool_i18n_current_lang: function() {
        return document.checkform.lang.value
    },
    languagetool_rpc_url: "https://languagetool.org/api/v2/check",
    languagetool_css_url: "https://www.languagetool.org/online-check/tiny_mce/plugins/atd-tinymce/css/content.css",
    theme: "advanced",
    theme_advanced_buttons1: "",
    theme_advanced_buttons2: "",
    theme_advanced_buttons3: "",
    theme_advanced_toolbar_location: "none",
    theme_advanced_toolbar_align: "left",
    theme_advanced_statusbar_location: "bottom",
    theme_advanced_path: !1,
    theme_advanced_resizing: !0,
    theme_advanced_resizing_use_cookie: !1,
    gecko_spellcheck: !1
});