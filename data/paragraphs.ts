// Array of paragraphs for the typing test
export const paragraphs = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. These words remind us that failure is not the opposite of success, but a stepping stone toward it.",
  "In the middle of difficulty lies opportunity. This timeless wisdom suggests that our greatest breakthroughs often emerge from our toughest challenges when we shift our perspective.",
  "Do not watch the clock, do the work. The clock will keep ticking regardless of what we accomplish. The difference between success and failure often comes down to how we use our time.",
  "The only way to do great work is to love what you do. Passion is the secret ingredient that separates good work from truly exceptional work. When we care, we naturally invest more energy.",
  "Life is what happens when you are busy making other plans. We spend so much time thinking about the future that the present moment slips by unnoticed and we miss the joy of now.",
  "Success is not final, failure is not fatal, it is the courage to continue that counts. This perspective liberates us from perfectionism and the fear of mistakes, letting us keep moving forward.",
  "Two roads diverged in a wood, and I took the one less traveled by, and that has made all the difference. Sometimes the risky or unconventional choices turn out to be the most meaningful.",
  "The future belongs to those who believe in the beauty of their dreams. Dreams are not just idle fantasies, they are blueprints for what we might create if we are willing to work for it.",
  "It does not matter how slowly you go as long as you do not stop. In our fast-paced world, we feel pressure to achieve quickly, but sustainable success is about consistency, not speed.",
  "Be yourself, everyone else is already taken. In a world that constantly tries to mold us, authenticity is an act of rebellion. The more we embrace our uniqueness, the more we stand out.",
  "The journey of a thousand miles begins with a single step. Every great accomplishment started with someone taking a small, uncertain first action. The secret is to focus on the next step.",
  "What we think, we become. Our thoughts actively shape the reality we experience. By becoming aware of our thought patterns and choosing constructive perspectives, we reshape our lives.",
  "Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present. The only moment we have any real influence over is right now, so make it count.",
  "Everything you can imagine is real. The human capacity for imagination is the source of every innovation and work of art. If we can conceive of something, we might be able to create it.",
  "The only impossible journey is the one you never begin. Fear and self-doubt keep countless dreams locked away. Starting is often the hardest part, but once in motion, momentum builds.",
  "Do not count the days, make the days count. It is easy to fall into the trap of just going through the motions. Each day is an opportunity to create something meaningful or learn something new.",
  "The best time to plant a tree was twenty years ago. The second best time is now. Dwelling on missed opportunities is just another way of avoiding action in the present. Start today.",
  "Life is ten percent what happens to you and ninety percent how you react to it. We have less control over circumstances than we believe, but we control how we respond to every challenge.",
  "The only person you are destined to become is the person you decide to be. There is no predetermined script for your life. Every day we make decisions that shape who we are becoming.",
  "You miss one hundred percent of the shots you do not take. Regret for things we did not try weighs heavier over time. At least when we try and fail, we gain experience and learn lessons."
];

// Get a random paragraph from the array
export function getRandomParagraph(): string {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}
