// Espera a que el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. EL MAPA DE LA MALLA (DATOS) ---
    // (Esta parte es idéntica)
    const mallaData = {
        // Semestre 1
        's1_contabilidad': { nombre: 'Contabilidad y Costos', prereqs: [] },
        's1_admin': { nombre: 'Administración de Empresas', prereqs: [] },
        's1_economia': { nombre: 'Fundamentos de Economía', prereqs: [] },
        's1_derecho': { nombre: 'Fundamentos de Derecho', prereqs: [] },
        's1_matematicas': { nombre: 'Matemáticas para Negocios', prereqs: [] },
        's1_comunicacion': { nombre: 'Técnicas de Comunicación', prereqs: [] },
        // Semestre 2
        's2_cont_gestion': { nombre: 'Contabilidad de Gestión', prereqs: ['s1_contabilidad'] },
        's2_liderazgo': { nombre: 'Taller de Liderazgo', prereqs: ['s1_admin'] },
        's2_microeconomia': { nombre: 'Microeconomía', prereqs: ['s1_economia', 's1_matematicas'] },
        's2_derecho_com': { nombre: 'Derecho Comercial y Tributario', prereqs: ['s1_derecho'] },
        's2_mat_financiera': { nombre: 'Matemática Financiera', prereqs: ['s1_matematicas'] },
        's2_ingles1': { nombre: 'Inglés I', prereqs: [] },
        // Semestre 3
        's3_finanzas1': { nombre: 'Finanzas I', prereqs: ['s2_cont_gestion', 's2_mat_financiera'] },
        's3_gestion_per': { nombre: 'Gestión de Personas', prereqs: ['s2_liderazgo'] },
        's3_macroeconomia': { nombre: 'Macroeconomía', prereqs: ['s2_microeconomia'] },
        's3_derecho_int': { nombre: 'Derecho Internacional', prereqs: ['s2_derecho_com'] },
        's3_estadistica': { nombre: 'Estadística Descriptiva', prereqs: ['s1_matematicas'] },
        's3_ingles2': { nombre: 'Inglés II', prereqs: ['s2_ingles1'] },
        // Semestre 4
        's4_finanzas2': { nombre: 'Finanzas II', prereqs: ['s3_finanzas1'] },
        's4_comportamiento': { nombre: 'Comportamiento Organizacional', prereqs: ['s3_gestion_per'] },
        's4_economia_int': { nombre: 'Economía Internacional', prereqs: ['s3_macroeconomia'] },
        's4_inferencia': { nombre: 'Inferencia Estadística', prereqs: ['s3_estadistica'] },
        's4_investigacion': { nombre: 'Metodología de la Investigación', prereqs: ['s1_comunicacion', 's3_estadistica'] },
        's4_ingles3': { nombre: 'Inglés III', prereqs: ['s3_ingles2'] },
        // Semestre 5
        's5_mkt': { nombre: 'Marketing', prereqs: ['s2_microeconomia'] },
        's5_negocios_int': { nombre: 'Negocios Internacionales', prereqs: ['s4_economia_int'] },
        's5_logistica': { nombre: 'Logística y Operaciones', prereqs: ['s1_admin'] },
        's5_econometria': { nombre: 'Econometría', prereqs: ['s4_inferencia'] },
        's5_etica': { nombre: 'Ética y RSE', prereqs: ['s1_derecho', 's2_liderazgo'] },
        's5_ingles4': { nombre: 'Inglés IV', prereqs: ['s4_ingles3'] },
        // Semestre 6
        's6_mkt_int': { nombre: 'Marketing Internacional', prereqs: ['s5_mkt'] },
        's6_finanzas_int': { nombre: 'Finanzas Internacionales', prereqs: ['s4_finanzas2', 's5_negocios_int'] },
        's6_comercio_ext': { nombre: 'Técnicas de Comercio Exterior', prereqs: ['s5_negocios_int'] },
        's6_proyectos': { nombre: 'Preparación y Ev. de Proyectos', prereqs: ['s4_finanzas2', 's5_econometria'] },
        's6_electivo_fg': { nombre: 'Electivo FG 1', prereqs: [] },
        's6_ingles5': { nombre: 'Inglés V', prereqs: ['s5_ingles4'] },
        // Semestre 7
        's7_mkt_global': { nombre: 'Marketing Global', prereqs: ['s6_mkt_int'] },
        's7_negociacion': { nombre: 'Negociación y Resolución', prereqs: ['s4_comportamiento', 's5_etica'] },
        's7_contratacion': { nombre: 'Contratación Internacional', prereqs: ['s3_derecho_int', 's6_comercio_ext'] },
        's7_logistica_int': { nombre: 'Logística Internacional', prereqs: ['s5_logistica', 's6_comercio_ext'] },
        's7_electivo_fg': { nombre: 'Electivo FG 2', prereqs: [] },
        's7_portugues1': { nombre: 'Portugués I', prereqs: [] },
        // Semestre 8
        's8_direccion': { nombre: 'Dirección Estratégica', prereqs: ['s6_proyectos'] },
        's8_cultura': { nombre: 'Cultura y Negocios', prereqs: ['s7_negociacion'] },
        's8_transporte': { nombre: 'Transporte y Seguros', prereqs: ['s7_logistica_int'] },
        's8_electivo_disc': { nombre: 'Electivo Disciplinar 1', prereqs: [] },
        's8_electivo_fg3': { nombre: 'Electivo FG 3', prereqs: [] },
        's8_portugues2': { nombre: 'Portugués II', prereqs: ['s7_portugues1'] },
        // Semestre 9
        's9_simulacion': { nombre: 'Simulación de Negocios', prereqs: ['s8_direccion'] },
        's9_innovacion': { nombre: 'Innovación y Emprendimiento', prereqs: ['s8_direccion'] },
        's9_practica1': { nombre: 'Práctica Profesional I', prereqs: ['s6_comercio_ext', 's6_mkt_int', 's6_finanzas_int'] },
        's9_electivo_disc2': { nombre: 'Electivo Disciplinar 2', prereqs: [] },
        's9_electivo_disc3': { nombre: 'Electivo Disciplinar 3', prereqs: [] },
        's9_portugues3': { nombre: 'Portugués III', prereqs: ['s8_portugues2'] },
        // Semestre 10
        's10_plan_negocios': { nombre: 'Plan de Negocios Internacionales', prereqs: ['s9_simulacion', 's9_innovacion'] },
        's10_practica2': { nombre: 'Práctica Profesional II', prereqs: ['s9_practica1'] },
        's10_electivo_disc4': { nombre: 'Electivo Disciplinar 4', prereqs: [] },
        's10_electivo_disc5': { nombre: 'Electivo Disciplinar 5', prereqs: [] },
        's10_portugues4': { nombre: 'Portugués IV', prereqs: ['s9_portugues3'] },
        // Semestre 11
        's11_tesis': { nombre: 'Trabajo de Tesis', prereqs: ['s10_plan_negocios', 's10_practica2'] }
    };

    // --- 2. EL ESTADO DEL PROGRAMA (CON MEMORIA) ---
    
    // NUEVO: Definimos una "llave" para guardar los datos en el navegador
    const STORAGE_KEY = 'mallaUvProgreso';

    // NUEVO: Función para cargar el progreso guardado
    function loadProgress() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            // Si hay datos, los convierte de un string de texto (JSON) a un Set
            return new Set(JSON.parse(savedData));
        }
        return new Set(); // Si no hay datos, empieza un Set vacío
    }

    // CAMBIADO: Ahora el Set se inicializa llamando a la función loadProgress()
    const approvedSubjects = loadProgress();

    // NUEVO: Función para guardar el progreso actual
    function saveProgress() {
        // Convierte el Set a un Array (porque JSON no entiende Set)
        const approvedArray = Array.from(approvedSubjects);
        // Convierte el Array a un string de texto (JSON)
        const jsonData = JSON.stringify(approvedArray);
        // Guarda ese string en el localStorage
        localStorage.setItem(STORAGE_KEY, jsonData);
    }


    // --- 3. FUNCIONES PRINCIPALES ---

    /**
     * Revisa si todos los prerrequisitos de un ramo están aprobados.
     * (Esta función es idéntica)
     */
    function checkPrerequisites(subjectId) {
        const prereqs = mallaData[subjectId].prereqs;
        if (prereqs.length === 0) {
            return true;
        }
        return prereqs.every(prereqId => approvedSubjects.has(prereqId));
    }

    /**
     * Actualiza el estado y las clases CSS de TODA la malla.
     * (Esta función es idéntica)
     */
    function updateMalla() {
        for (const subjectId in mallaData) {
            const element = document.getElementById(subjectId);
            if (!element) continue; 

            element.classList.remove('locked', 'available', 'approved');

            if (approvedSubjects.has(subjectId)) {
                element.classList.add('approved');
            } else if (checkPrerequisites(subjectId)) {
                element.classList.add('available');
            } else {
                element.classList.add('locked');
            }
        }
    }

    /**
     * Maneja el evento de clic en un ramo.
     */
    function handleSubjectClick(event) {
        const subjectId = event.target.id;
        if (!subjectId) return;

        const element = event.target;

        if (element.classList.contains('available')) {
            approvedSubjects.add(subjectId);
        } else if (element.classList.contains('approved')) {
            approvedSubjects.delete(subjectId);
        } else if (element.classList.contains('locked')) {
            console.log(`Intento de clic en ramo bloqueado: ${subjectId}`);
        }

        // Después de cualquier clic, actualiza toda la malla
        updateMalla();

        // NUEVO: Llama a la función de guardar cada vez que se hace un clic
        saveProgress();
    }

    // --- 4. INICIALIZACIÓN ---
    // (Esta parte es idéntica)

    const mallaContainer = document.querySelector('.malla-curricular');
    mallaContainer.addEventListener('click', handleSubjectClick);

    // Llama a la función de actualización una vez al inicio
    // para poner los ramos del primer semestre en amarillo (available)
    updateMalla();
});