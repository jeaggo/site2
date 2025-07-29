// Funcionalidad del sitio web del Hackathon ServiceNow

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const registerBtn = document.getElementById('registerBtn');
    const successMessage = document.getElementById('successMessage');
    
    // Estado de registro
    let isRegistered = false;
    
    // Función para manejar el registro
    function handleRegister() {
        if (!isRegistered) {
            // Simular proceso de registro
            registerBtn.textContent = 'Procesando...';
            registerBtn.disabled = true;
            
            // Simular delay de procesamiento
            setTimeout(() => {
                isRegistered = true;
                registerBtn.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Agregar animación de éxito
                successMessage.style.animation = 'fadeIn 0.5s ease-out';
                
                // Opcional: mostrar confetti o algún efecto visual
                showSuccessEffect();
            }, 1500);
        }
    }
    
    // Función para mostrar efecto de éxito
    function showSuccessEffect() {
        // Crear elementos de confetti simples
        for (let i = 0; i < 20; i++) {
            createConfetti();
        }
    }
    
    // Función para crear confetti
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        // Animar el confetti
        let position = -10;
        const fallSpeed = Math.random() * 3 + 2;
        const sway = Math.random() * 2 - 1;
        
        const animation = setInterval(() => {
            position += fallSpeed;
            confetti.style.top = position + 'px';
            confetti.style.left = (parseFloat(confetti.style.left) + sway) + 'px';
            
            if (position > window.innerHeight) {
                clearInterval(animation);
                document.body.removeChild(confetti);
            }
        }, 16);
    }
    
    // Función para obtener color aleatorio
    function getRandomColor() {
        const colors = ['#059669', '#2563eb', '#7c3aed', '#dc2626', '#ea580c', '#ca8a04'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Event listener para el botón de registro
    registerBtn.addEventListener('click', handleRegister);
    
    // Animación de scroll suave para hashtags
    const hashtags = document.querySelectorAll('.hashtag');
    hashtags.forEach(hashtag => {
        hashtag.addEventListener('click', function() {
            // Simular búsqueda del hashtag (en una implementación real, esto podría redirigir a redes sociales)
            const tag = this.textContent;
            console.log(`Buscando: ${tag}`);
            
            // Efecto visual de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Animación de entrada para elementos cuando aparecen en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.benefit-item, .detail-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Función para copiar hashtag al clipboard
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Hashtag copiado al portapapeles!');
            });
        } else {
            // Fallback para navegadores más antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('Hashtag copiado al portapapeles!');
        }
    }
    
    // Función para mostrar toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.background = '#059669';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.zIndex = '10000';
        toast.style.animation = 'fadeIn 0.3s ease';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }
    
    // Agregar funcionalidad de copia a hashtags
    hashtags.forEach(hashtag => {
        hashtag.addEventListener('dblclick', function() {
            copyToClipboard(this.textContent);
        });
        
        // Agregar tooltip
        hashtag.title = 'Doble click para copiar';
    });
    
    // Smooth scroll para navegación interna (si se agregan enlaces)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Agregar estilos CSS para animaciones adicionales
    const additionalStyles = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
        
        .hashtag {
            cursor: pointer;
            user-select: none;
        }
        
        .register-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    
    console.log('Hackathon ServiceNow - Sitio web cargado correctamente');
});

