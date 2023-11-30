using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class Enemy : MonoBehaviour
{
    private PlayerMovement mainPlayer;
    public GameObject dropCoin;
    public SpriteRenderer spriteRenderer;
    [SerializeField] private int life;
    private float cooldown = 2f;
    private float lastAttackedAt = 0f;
    private int lifeMax;
    [SerializeField] private int degat;
    private bool isAttack = false;
    [SerializeField] private float flashTime;
    private bool isDeath = false;
    private Color originalColor;
    protected Rigidbody2D rb;
    protected Transform target;
    private bool isHit;
    protected Animator animator;
    public void Start()
    {
        this.mainPlayer = GameObject.Find("Player") ? GameObject.FindWithTag("Player").GetComponent<Warrior>() : GameObject.FindWithTag("Player").GetComponent<Archer>();
        rb = gameObject.GetComponent<Rigidbody2D>();
        animator = gameObject.GetComponent<Animator>();
        spriteRenderer = gameObject.GetComponent<SpriteRenderer>();
        target = mainPlayer.GetComponent<Transform>();
        originalColor = spriteRenderer.color;
        this.lifeMax = life;
    }

    // Update is called once per frame
    public void Update()
    {

        animationAttackEnemy();
        if (isAttack == true)
        {
            if (Time.time > lastAttackedAt + cooldown)
            {
                isHit = true;
                AttackPlayer();
            }
            else{
                isHit = false;
            }
        }
        else{
            isHit = false;
        }
        if (life <= 0 || isDeath)
        {
            Instantiate(dropCoin,transform.position,Quaternion.identity);
            Death();
        }
    }

    private void animationAttackEnemy(){
        animator.SetBool("isHit", isHit);
    }
    private void FlashColor(float time)
    {
        spriteRenderer.color = Color.red;
        Invoke("ResetColor", time);
    }

    private void ResetColor()
    {
        spriteRenderer.color = originalColor;
    }

    private void Death()
    {
        life = life - life;
        gameObject.SetActive(false);
        isDeath = true;
    }

    public void AttackPlayer()
    {
        mainPlayer.Attack(degat, transform.position);
        isAttack = false;
        lastAttackedAt = Time.time;
    }
    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "Player")
        {
            isAttack = true;
        }
        if (col.gameObject.tag == "water")
        {
            isDeath = true;
        }


    }

    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.tag == "Player")
        {
            isAttack = false;
        }

    }

    public void Attack(int degat, Vector3 playerPosition)
    {
        life = life - degat;
        Vector2 direction = (playerPosition - transform.position) * -1;
        rb.AddForce(new Vector3(direction.x * 200.0f, 100.0f, 0f));
        FlashColor(flashTime);
    }

    public int getLife()
    {
        return life;
    }

    public int getLifeMax()
    {
        return lifeMax;
    }
}
