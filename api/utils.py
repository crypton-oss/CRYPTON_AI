import datetime
import os

def log_conversation(query, response):
    """Barcha so'rov va javoblarni log/chat_history.log fayliga saqlaydi"""
    if not os.path.exists('logs'):
        os.makedirs('logs')
        
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open('logs/chat_history.log', 'a', encoding='utf-8') as f:
        f.write(f"--- {timestamp} ---\n")
        f.write(f"USER: {query}\n")
        f.write(f"CRYPTON: {response}\n\n")

def get_crypton_banner():
    """Loyiha ishga tushganda terminalda ko'rinadigan ASCII Banner"""
    banner = """
    #################################################
    #                                               #
    #   ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ 
    #  ██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝   #
    #  ██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║      #
    #  ██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║      #
    #  ╚██████╗██║  ██║   ██║   ██║        ██║      #
    #   ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝      #
    #                                               #
    #           [ TERMINAL ACCESS GRANTED ]         #
    #           [ SYSTEM: UNCENSORED AI ]           #
    #################################################
    """
    return banner

def format_ai_response(text):
    """Javobni terminalga moslab biroz tozalash yoki bezash"""
    # Masalan, javob boshiga doim o'zgarmas belgi qo'shish
    return f"⚡ {text.strip()}"